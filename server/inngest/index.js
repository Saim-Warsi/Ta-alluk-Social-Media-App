import { Inngest } from "inngest";
import User from "../models/User.js";
import Connection from "../models/Connection.js";
import Story from "../models/Story.js";
import sendEmail from "../configs/nodeMailer.js";
import Message from "../models/Message.js";

export const inngest = new Inngest({ id: "my-app" });

// inggest function to save the user to database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    let username = email_addresses[0].email_address.split("@")[0];

    // check if user exists
    const user = await User.findOne({ username });

    if (user) {
      username = username + Math.floor(Math.random() * 1000);
    }
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
      username: username,
    };
    await User.create(userData);
  }
);
// inggest function to update the user data
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const updatedUserData = {
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
    };
    await User.findByIdAndUpdate(id, updatedUserData);
  }
);

// inggest function to delete the user data
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

//inngest function for sending email when connection requrest is revcieved
const sendNewConnectionRequestReminder = inngest.createFunction(
  { id: "send-new-connection-request-reminder" },
  { event: "app/connection-request" },
  async ({ event, step }) => {
    const { connectionId } = event.data;

    await step.run("send-connection-request-email", async () => {
      const connection = await Connection.findById(connectionId).populate(
        "from_user_id to_user_id"
      );
      const subject = `New Connection Request`;
      const body = `
           
       <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
         <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 16px 16px 0 0; text-align: center;">
             <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">New Connection Request</h1>
         </div>
  
         <div style="background: #ffffff; padding: 40px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
             Hi <strong>${connection.to_user_id.full_name}</strong>,
            </p>
    
    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
      <strong>${connection.from_user_id.full_name}</strong> wants to connect with you!
    </p>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="${process.env.FRONTEND_URL}/connections" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
        View Request
      </a>
    </div>
    
    <div style="margin-top: 40px; padding-top: 32px; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0;">
        Best regards,<br>
        <strong style="color: #374151;">Ta'alluk</strong>
      </p>
    </div>
  </div>
  
  <div style="text-align: center; margin-top: 32px;">
    <p style="color: #9ca3af; font-size: 12px; line-height: 1.5;">
      You're receiving this because someone requested to connect with you.<br>
      If you didn't expect this, you can safely ignore this email.
    </p>
  </div>
</div> `;

      await sendEmail({
        to: connection.to_user_id.email,
        subject,
        body,
      });
    });
    const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("wait-for-24-hours", in24Hours);
    await step.run("send-connection-request-reminder", async () => {
      const connection = await Connection.findById(connectionId).populate(
        "from_user_id to_user_id"
      );
      if (connection.status === "accepted") {
        return {
          message: "Already accepted.",
        };
      }

      const subject = `New Connection Request`;
      const body = `
           
       <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
         <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 16px 16px 0 0; text-align: center;">
             <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">New Connection Request</h1>
         </div>
  
         <div style="background: #ffffff; padding: 40px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
             Hi <strong>${connection.to_user_id.full_name}</strong>,
            </p>
    
    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
      <strong>${connection.from_user_id.full_name}</strong> wants to connect with you!
    </p>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="${process.env.FRONTEND_URL}/connections" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
        View Request
      </a>
    </div>
    
    <div style="margin-top: 40px; padding-top: 32px; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0;">
        Best regards,<br>
        <strong style="color: #374151;">Ta'alluk</strong>
      </p>
    </div>
  </div>
  
  <div style="text-align: center; margin-top: 32px;">
    <p style="color: #9ca3af; font-size: 12px; line-height: 1.5;">
      You're receiving this because someone requested to connect with you.<br>
      If you didn't expect this, you can safely ignore this email.
    </p>
  </div>
</div> `;

      await sendEmail({
        to: connection.to_user_id.email,
        subject,
        body,
      });
      return {
        message: "Reminder sent!",
      };
    });
  }
);

//function to automatically delete story after 24hrs
const deleteStory = inngest.createFunction(
  { id: "story-delete" },
  { event: "app/story.delete" },
  async ({ event, step }) => {
    const { storyId } = event.data;
    const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("wait-for-24-hours", in24Hours);
    await step.run("delete-story", async () => {
      await Story.findByIdAndDelete(storyId);
      return { message: "Story deleted." };
    });
  }
);

const sendNotificationOfUnseenMessages = inngest.createFunction(
  { id: "send-unseen-messages-notification" },
  { cron: "TZ=America/New_York 0 9 * * *" }, // Every day 9 am

  async ({ step }) => {
    const messages = await Message.find({ seen: false }).populate("to_user_id");
    const unseenCount = {};

    messages.map((message) => {
      unseenCount[message.to_user_id._id] =
        (unseenCount[message.to_user_id._id] || 0) + 1;
    });
    for (const userId in unseenCount) {
      const user = await User.findById(userId);

      const subject = `You have ${unseenCount[userId]} unseen messages`;
      const body = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
         <h2>Hey ${user.full_name},</h2>
         <p>You have ${unseenCount[userId]} unseen messages</p>
         <p>Click <a href="${process.env.FRONTEND_URL}/messages" style="color: #10b981">
         here</a> to view them</p>
         <br/>
         <p>Thanks,<br/>Ta'alluk</p>
      </div>
`;

    await sendEmail({
      to:user.email,
      subject,
      body
    })
    }
    return {message: "Notification sent."}
  }
);

export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
  sendNewConnectionRequestReminder,
  deleteStory,
  sendNotificationOfUnseenMessages
];
