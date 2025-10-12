# EmailJS Setup Guide

This guide will help you set up EmailJS for your booking form.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. From your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the connection steps for your provider
5. **Save your Service ID** (you'll need this later)

### Gmail Setup (Recommended)
- Choose "Gmail" as your service
- Click "Connect Account" and sign in with your Gmail
- Grant EmailJS permission to send emails on your behalf

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template content:

### Template Subject:
```
New Booking Request from {{client_name}}
```

### Template Body:
```
═══════════════════════════════════════
         NEW BOOKING REQUEST
═══════════════════════════════════════

CLIENT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {{client_name}}
Email: {{client_email}}
Phone: {{client_phone}}
Pronouns: {{client_pronouns}}
Preferred Contact: {{preferred_contact}}

BOOKING DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Desired City: {{desired_city}}
Date Length: {{date_length}}
Preferred Date/Time: {{preferred_datetime}}
Location Preference: {{location_type}}

ADDITIONAL INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{additional_info}}

═══════════════════════════════════════
Reply To: {{reply_to}}
═══════════════════════════════════════
```

4. Set the **To Email** field to: `casperigram@gmail.com`
5. Set the **From Name** to: `{{from_name}}`
6. Set the **From Email** to: `{{from_email}}`
7. Set the **Reply To** to: `{{reply_to}}`
8. Click **Save**
9. **Save your Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** section
3. **Copy your Public Key** (starts with something like `user_...`)

## Step 5: Update Your Website Code

Open `script.js` and find these lines near the top:

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

Replace:
- `YOUR_PUBLIC_KEY` with your Public Key
- `YOUR_SERVICE_ID` with your Service ID (from Step 2)
- `YOUR_TEMPLATE_ID` with your Template ID (from Step 3)

### Example:
```javascript
const EMAILJS_PUBLIC_KEY = 'user_abc123xyz789';
const EMAILJS_SERVICE_ID = 'service_gmail_abc';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
```

## Step 6: Test Your Form

1. Save all your changes
2. Open your website in a browser
3. Fill out the booking form with test data
4. Submit the form
5. Check `casperigram@gmail.com` for the test booking email

## Troubleshooting

### Email not sending?
- Check browser console for errors (F12)
- Verify all three IDs are correct in `script.js`
- Make sure EmailJS service is connected properly
- Check EmailJS dashboard for any error messages

### Form submits but no email?
- Verify the "To Email" in your template is set to `casperigram@gmail.com`
- Check your EmailJS dashboard usage limits (free tier: 200 emails/month)
- Make sure your email service is still connected

### Variables not showing in email?
- Make sure template variable names match exactly (case-sensitive)
- Double-check the template syntax: `{{variable_name}}`

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Basic email services
- Standard support

For more emails, consider upgrading to a paid plan.

## Security Note

Your EmailJS Public Key is safe to be visible in client-side code. It's designed to be public and cannot be used to send spam or access your account.

## Support

If you need help:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
