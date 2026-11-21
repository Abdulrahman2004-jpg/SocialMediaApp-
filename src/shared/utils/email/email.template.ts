export const emailTemplate = (otp: number) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Account Verification - ConnectHub</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial, Helvetica, sans-serif;">

<table align="center" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff;margin-top:40px;border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.07);">

<!-- Header -->
<tr>
<td style="background:linear-gradient(135deg,#0f766e,#2563eb);padding:26px;text-align:center;">
<h2 style="color:#ffffff;margin:0;">
ConnectHub
</h2>
<p style="color:#e0f2fe;font-size:14px;margin-top:6px;">
Build real connections.
</p>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:30px;text-align:center;">

<p style="color:#334155;font-size:16px;margin-bottom:10px;">
Welcome 👋
</p>

<p style="color:#64748b;font-size:15px;">
Enter the one-time verification code below to activate your ConnectHub account.
</p>

<div style="
background:#f0fdfa;
border:2px dashed #0f766e;
border-radius:10px;
padding:20px;
margin:28px 0;
font-size:30px;
letter-spacing:8px;
font-weight:bold;
color:#0f766e;
">
${otp}
</div>

<p style="color:#94a3b8;font-size:13px;">
This code expires soon. Keep it private for your security.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#f8fafc;padding:18px;text-align:center;">

<p style="color:#475569;font-size:13px;margin:0;">
See you inside — ConnectHub Team
</p>

<p style="color:#94a3b8;font-size:12px;margin-top:8px;">
© 2026 ConnectHub. All rights reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`;
};