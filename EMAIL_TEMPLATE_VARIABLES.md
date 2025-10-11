# Email Template Variables Reference

This file contains all the variables available in the email template that are sent from the booking form.

## Available Variables

When creating or modifying your EmailJS template, you can use these variables by wrapping them in double curly braces: `{{variable_name}}`

### Contact Information
```
{{to_email}}           - Recipient email (casperigram@gmail.com)
{{from_name}}          - Sender name (client's name)
{{from_email}}         - Sender email (client's email)
{{client_name}}        - Full name of the client
{{client_email}}       - Client's email address
{{client_phone}}       - Client's phone number
{{client_pronouns}}    - Client's preferred pronouns
{{preferred_contact}}  - Preferred contact method (email/phone/text)
```

### Booking Details
```
{{desired_city}}       - City where client wants to book
{{date_length}}        - Duration of the booking (e.g., "2 hours")
{{preferred_datetime}} - Formatted date and time (e.g., "Monday, January 15, 2025, 02:00 PM")
{{location_type}}      - Incall or Outcall
```

### Verification Documents
```
{{id_front_name}}      - Filename of front ID image
{{id_selfie_name}}     - Filename of selfie with ID
{{id_front_attachment}} - Base64 encoded front ID image (for attachment)
{{id_selfie_attachment}} - Base64 encoded selfie image (for attachment)
```

### Additional Information
```
{{subject}}            - Email subject line
{{message}}            - Full formatted message body (plain text version)
{{current_date}}       - Current submission date/time
```

## Example Usage in Template

### Basic Text Format:
```
New booking request from {{client_name}}

Contact: {{client_email}} | {{client_phone}}
Preferred Method: {{preferred_contact}}

Booking: {{date_length}} in {{desired_city}}
Date/Time: {{preferred_datetime}}
Type: {{location_type}}
```

### HTML Format (Styled):
```html
<h2>Booking from {{client_name}}</h2>
<p><strong>Email:</strong> {{client_email}}</p>
<p><strong>Phone:</strong> {{client_phone}}</p>
<p><strong>Location:</strong> {{desired_city}}</p>
<p><strong>When:</strong> {{preferred_datetime}}</p>
```

## Notes

1. **Case Sensitive:** Variable names must match exactly
2. **Attachments:** The `_attachment` variables contain Base64 image data
3. **Formatting:** The `preferred_datetime` is already formatted nicely
4. **Missing Variables:** If a variable isn't found, EmailJS will leave it blank

## Customization Tips

Want to change the email format? 
1. Log into EmailJS.com
2. Go to Email Templates
3. Edit your template
4. Use any of the variables above
5. Save and test!

The JavaScript code automatically populates all these variables when the form is submitted.
