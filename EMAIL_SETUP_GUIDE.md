# Email Booking System Setup Guide

This guide will walk you through setting up the email functionality for your booking form using EmailJS.

## Overview

The booking form now collects all information and sends a formatted email to **casperigram@gmail.com** with:
- All form field data (name, email, phone, pronouns, etc.)
- Booking details (city, date/time, duration, location preference)
- ID verification images attached
- Professional formatting for easy reading

---

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **"Sign Up"** (top right)
3. Create a free account using any email address
4. Verify your email address

---

## Step 2: Add Email Service

1. Once logged in, click **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Select **Gmail** (recommended) or your preferred email provider
4. Follow the prompts to connect your **casperigram@gmail.com** account:
   - For Gmail: You'll authorize EmailJS to send emails on your behalf
   - This is the email address that will **send** the booking notifications
5. Click **"Create Service"**
6. **Copy the Service ID** (looks like `service_xxxxxxx`) - you'll need this later

---

## Step 3: Create Email Template

1. Click **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Delete the default template content and paste this:

### Template Content:

**To Email:**
```
{{to_email}}
```

**From Name:**
```
Makayla Moon Website - Booking Request
```

**From Email:**
```
{{from_email}}
```

**Subject:**
```
🌙 New Booking Request from {{client_name}}
```

**Message Body:**
```html
<div style="font-family: 'Courier New', monospace; background-color: #1a1a1a; color: #f0f0f0; padding: 30px; border-radius: 10px;">
    <div style="background: linear-gradient(135deg, #d4af37, #aa8929); padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
        <h1 style="margin: 0; color: #1a1a1a; font-size: 28px;">🌙 NEW BOOKING REQUEST 🌙</h1>
    </div>

    <div style="background-color: #2d1b3d; padding: 25px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #d4af37;">
        <h2 style="color: #d4af37; margin-top: 0; font-size: 20px; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">👤 CLIENT INFORMATION</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 8px 0; color: #d4af37; font-weight: bold; width: 200px;">Name:</td>
                <td style="padding: 8px 0; color: #f0f0f0;">{{client_name}}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; color: #f0f0f0;"><a href="mailto:{{client_email}}" style="color: #87ceeb;">{{client_email}}</a></td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0; color: #f0f0f0;">{{client_phone}}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">Pronouns:</td>
                <td style="padding: 8px 0; color: #f0f0f0;">{{client_pronouns}}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">Preferred Contact:</td>
                <td style="padding: 8px 0; color: #f0f0f0;">{{preferred_contact}}</td>
            </tr>
        </table>
    </div>

    <div style="background-color: #2d1b3d; padding: 25px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #d4af37;">
        <h2 style="color: #d4af37; margin-top: 0; font-size: 20px; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">📅 BOOKING DETAILS</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 8px 0; color: #d4af37; font-weight: bold; width: 200px;">Desired City:</td>
                <td style="padding: 8px 0; color: #f0f0f0;">{{desired_city}}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">Date Length:</td>
                <td style="padding: 8px 0; color: #f0f0f0;">{{date_length}}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">Preferred Date/Time:</td>
                <td style="padding: 8px 0; color: #f0f0f0;">{{preferred_datetime}}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">Location Type:</td>
                <td style="padding: 8px 0; color: #f0f0f0;">{{location_type}}</td>
            </tr>
        </table>
    </div>

    <div style="background-color: #2d1b3d; padding: 25px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #d4af37;">
        <h2 style="color: #d4af37; margin-top: 0; font-size: 20px; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">🔐 VERIFICATION DOCUMENTS</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 8px 0; color: #d4af37; font-weight: bold; width: 200px;">ID Front:</td>
                <td style="padding: 8px 0; color: #f0f0f0;">{{id_front_name}}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">ID Selfie:</td>
                <td style="padding: 8px 0; color: #f0f0f0;">{{id_selfie_name}}</td>
            </tr>
        </table>
        <p style="color: #87ceeb; margin-top: 15px; font-style: italic;">📎 Note: ID documents are attached to this email.</p>
    </div>

    <div style="text-align: center; padding: 20px; background-color: #1a1a1a; border-radius: 8px; margin-top: 30px;">
        <p style="color: #888; margin: 0; font-size: 12px;">Submitted: {{current_date}}</p>
        <p style="color: #d4af37; margin: 10px 0 0 0; font-size: 14px;">Makayla Moon Inc. | Booking System</p>
    </div>
</div>
```

**Important Settings in Template:**
- Make sure the **"To email"** field contains: `{{to_email}}`
- This allows the script to dynamically specify casperigram@gmail.com

4. Click **"Save"**
5. **Copy the Template ID** (looks like `template_xxxxxxx`) - you'll need this

---

## Step 4: Get Your Public Key

1. Click **"Account"** in the left sidebar
2. Under **"General"** tab, find **"Public Key"**
3. **Copy the Public Key** (looks like a long alphanumeric string)

---

## Step 5: Configure Your Website

1. Open `script.js` in your website files
2. Find this section near the top of the booking form code (around line 217):

```javascript
const EMAILJS_CONFIG = {
    serviceID: 'YOUR_SERVICE_ID',
    templateID: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY'
};
```

3. Replace the placeholder values with your actual EmailJS credentials:

```javascript
const EMAILJS_CONFIG = {
    serviceID: 'service_xxxxxxx',      // From Step 2
    templateID: 'template_xxxxxxx',    // From Step 3
    publicKey: 'your_public_key_here'  // From Step 4
};
```

4. Save the file

---

## Step 6: Test the Form

1. Upload your updated website files to your web server
2. Visit your website and navigate to the booking form
3. Fill out all the fields with test data
4. Upload test images for the ID fields (keep them small - under 500KB each)
5. Submit the form
6. Check **casperigram@gmail.com** for the booking notification email

---

## Features Included

✅ **All form data captured and formatted**
- Name, email, phone, pronouns
- Preferred contact method
- City, date/time, duration
- Location preference (incall/outcall)

✅ **ID Verification Images**
- Both ID images attached to email
- File names and sizes displayed
- Base64 encoding for reliable delivery

✅ **Professional Email Format**
- Clean, organized layout
- Easy to read sections
- Styled HTML email

✅ **User Experience**
- Loading indicator while sending
- Success/error messages
- Form validation
- Auto-reset after successful submission

✅ **Error Handling**
- File size validation (prevents oversized images)
- Network error handling
- User-friendly error messages

---

## Important Notes

### File Size Limits
- EmailJS has a 500KB limit per attachment
- Total email size should stay under 1MB
- The form will warn users if files are too large
- **Recommendation:** Ask clients to compress images before uploading

### Alternative for Large Files
If you need to handle larger ID images, consider these options:

**Option 1: Cloud Storage (Recommended)**
- Use Cloudinary, AWS S3, or similar
- Upload images to cloud storage
- Send download links in the email instead

**Option 2: Premium EmailJS Plan**
- Upgrade to Pro plan ($8/month) for larger attachments
- Increased API quota

### Free Tier Limits
- 200 emails per month
- 500KB attachment limit
- If you exceed limits, emails will fail

### Security Considerations
- EmailJS keys are public (exposed in browser)
- This is normal for client-side email services
- Add domain whitelist in EmailJS dashboard: Settings → Security
- Never store sensitive data in the code

---

## Troubleshooting

### Email not received?
1. Check spam/junk folder
2. Verify Service ID, Template ID, and Public Key are correct
3. Check EmailJS dashboard for error logs
4. Ensure Gmail account is properly connected

### "Configuration error" message?
- Double-check all three credentials in script.js
- Make sure there are no extra spaces or quotes
- Verify the template variables match exactly

### Images not attached?
- Check file sizes (must be under 500KB each)
- Try compressing images
- Ensure file input has `accept="image/*"` attribute

### Form submits but no email?
- Open browser console (F12) and check for errors
- Verify EmailJS service is active
- Check monthly quota hasn't been exceeded

---

## Contact

If you need help with setup, the email should be working once you complete these steps. Test thoroughly with small image files first!

For EmailJS support: https://www.emailjs.com/docs/

---

**Next Steps:**
1. ✅ Complete Steps 1-5 above
2. ✅ Test with small image files
3. ✅ Verify email formatting looks good
4. ✅ Add domain whitelist in EmailJS security settings
5. ✅ Go live!
