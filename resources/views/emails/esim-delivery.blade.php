<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your eSIM is Ready</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7f6;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">

                    {{-- Header --}}
                    <tr>
                        <td style="background: linear-gradient(135deg, #059669, #10b981); padding: 32px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">AfriSIM</h1>
                            <p style="margin: 8px 0 0; color: #d1fae5; font-size: 14px;">Stay Connected Across Africa</p>
                        </td>
                    </tr>

                    {{-- eSIM Ready Banner --}}
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center;">
                            <div style="display: inline-block; background-color: #ecfdf5; border-radius: 50%; width: 64px; height: 64px; line-height: 64px; font-size: 32px; margin-bottom: 16px;">&#128246;</div>
                            <h2 style="margin: 0 0 8px; color: #059669; font-size: 24px; font-weight: 700;">Your eSIM is Ready!</h2>
                            <p style="margin: 0; color: #6b7280; font-size: 15px;">Your eSIM has been generated and is ready for activation. Follow the steps below to get connected.</p>
                        </td>
                    </tr>

                    {{-- Plan & Country Details --}}
                    <tr>
                        <td style="padding: 20px 40px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 16px 20px; border-bottom: 1px solid #e5e7eb;">
                                        <span style="color: #6b7280; font-size: 13px;">Plan</span><br>
                                        <strong style="color: #111827; font-size: 16px;">{{ $esim->orderItem->plan->name ?? 'eSIM Plan' }}</strong>
                                    </td>
                                    <td style="padding: 16px 20px; border-bottom: 1px solid #e5e7eb; text-align: right;">
                                        <span style="color: #6b7280; font-size: 13px;">Country</span><br>
                                        <strong style="color: #111827; font-size: 16px;">{{ $esim->orderItem->plan->country->name ?? 'Africa' }}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 16px 20px;">
                                        <span style="color: #6b7280; font-size: 13px;">Data</span><br>
                                        <strong style="color: #111827; font-size: 16px;">{{ $esim->orderItem->plan->data_amount ?? 'N/A' }}</strong>
                                    </td>
                                    <td style="padding: 16px 20px; text-align: right;">
                                        <span style="color: #6b7280; font-size: 13px;">Validity</span><br>
                                        <strong style="color: #111827; font-size: 16px;">{{ $esim->orderItem->plan->duration_days ?? 'N/A' }} days</strong>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    {{-- QR Code Section --}}
                    <tr>
                        <td style="padding: 20px 40px; text-align: center;">
                            <h3 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600;">Scan to Install Your eSIM</h3>
                            <div style="display: inline-block; background-color: #ffffff; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                                @if ($esim->qr_code_data)
                                    <div style="width: 200px; height: 200px; display: inline-block;">
                                        {!! $esim->qr_code_data !!}
                                    </div>
                                @else
                                    <div style="width: 200px; height: 200px; background-color: #f3f4f6; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                                        <p style="color: #6b7280; font-size: 14px;">Log in to your AfriSIM account to view your QR code</p>
                                    </div>
                                @endif
                            </div>
                            <p style="margin: 12px 0 0; color: #9ca3af; font-size: 12px;">You can also view this QR code by logging into your AfriSIM dashboard.</p>
                        </td>
                    </tr>

                    {{-- ICCID & Activation Code --}}
                    <tr>
                        <td style="padding: 20px 40px;">
                            <h3 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600;">eSIM Details</h3>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #fefce8; border: 1px solid #fde68a; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 16px 20px; border-bottom: 1px solid #fde68a;">
                                        <span style="color: #92400e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">ICCID</span><br>
                                        <code style="color: #111827; font-size: 15px; font-family: 'Courier New', monospace; word-break: break-all;">{{ $esim->iccid }}</code>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 16px 20px;">
                                        <span style="color: #92400e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Activation Code (Manual Entry)</span><br>
                                        <code style="color: #111827; font-size: 13px; font-family: 'Courier New', monospace; word-break: break-all;">{{ $esim->activation_code }}</code>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    {{-- Step-by-Step Activation --}}
                    <tr>
                        <td style="padding: 20px 40px;">
                            <div style="background-color: #f0fdf4; border-left: 4px solid #059669; border-radius: 0 8px 8px 0; padding: 24px;">
                                <h3 style="margin: 0 0 16px; color: #059669; font-size: 16px; font-weight: 600;">Step-by-Step Activation</h3>
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="padding: 8px 0; vertical-align: top; width: 32px;">
                                            <span style="display: inline-block; background-color: #059669; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-size: 13px; font-weight: 600;">1</span>
                                        </td>
                                        <td style="padding: 8px 0 8px 12px; color: #374151; font-size: 14px;">
                                            <strong>Connect to Wi-Fi</strong> - Make sure you have an internet connection before starting.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; vertical-align: top; width: 32px;">
                                            <span style="display: inline-block; background-color: #059669; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-size: 13px; font-weight: 600;">2</span>
                                        </td>
                                        <td style="padding: 8px 0 8px 12px; color: #374151; font-size: 14px;">
                                            <strong>Open Camera App</strong> - Point your phone's camera at the QR code above.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; vertical-align: top; width: 32px;">
                                            <span style="display: inline-block; background-color: #059669; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-size: 13px; font-weight: 600;">3</span>
                                        </td>
                                        <td style="padding: 8px 0 8px 12px; color: #374151; font-size: 14px;">
                                            <strong>Follow Prompts</strong> - Tap the notification to add the eSIM cellular plan.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; vertical-align: top; width: 32px;">
                                            <span style="display: inline-block; background-color: #059669; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-size: 13px; font-weight: 600;">4</span>
                                        </td>
                                        <td style="padding: 8px 0 8px 12px; color: #374151; font-size: 14px;">
                                            <strong>Label Your Plan</strong> - Choose a label like "Travel" for easy identification.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; vertical-align: top; width: 32px;">
                                            <span style="display: inline-block; background-color: #059669; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-size: 13px; font-weight: 600;">5</span>
                                        </td>
                                        <td style="padding: 8px 0 8px 12px; color: #374151; font-size: 14px;">
                                            <strong>Enable Data Roaming</strong> - Go to Settings &gt; Cellular &gt; your eSIM plan and turn on Data Roaming.
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>

                    {{-- Manual Installation Note --}}
                    <tr>
                        <td style="padding: 10px 40px 20px;">
                            <p style="margin: 0; color: #6b7280; font-size: 13px;">
                                <strong>Can't scan the QR code?</strong> Go to Settings &gt; Cellular &gt; Add Cellular Plan &gt; Enter Details Manually, and use the activation code listed above.
                            </p>
                        </td>
                    </tr>

                    {{-- Device Compatibility --}}
                    <tr>
                        <td style="padding: 10px 40px 20px;">
                            <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px 20px;">
                                <h4 style="margin: 0 0 8px; color: #1e40af; font-size: 14px; font-weight: 600;">Device Compatibility</h4>
                                <p style="margin: 0; color: #374151; font-size: 13px; line-height: 1.6;">
                                    eSIM is supported on iPhone XS and later, Samsung Galaxy S20 and later, Google Pixel 3 and later, and most recent flagship devices. Ensure your device is carrier-unlocked for the eSIM to work properly. For a full list of compatible devices, visit <a href="https://afrisim.com/compatibility" style="color: #059669; text-decoration: none;">afrisim.com/compatibility</a>.
                                </p>
                            </div>
                        </td>
                    </tr>

                    {{-- Expiration Note --}}
                    <tr>
                        <td style="padding: 10px 40px 20px;">
                            <p style="margin: 0; color: #6b7280; font-size: 13px; text-align: center;">
                                Your eSIM is valid until <strong style="color: #111827;">{{ $esim->expires_at ? $esim->expires_at->format('M d, Y') : 'N/A' }}</strong>. Make sure to activate before this date.
                            </p>
                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td style="background-color: #f9fafb; padding: 32px 40px; border-top: 1px solid #e5e7eb;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="margin: 0 0 8px; color: #059669; font-size: 16px; font-weight: 600;">Need Help Activating?</p>
                                        <p style="margin: 0 0 4px; color: #6b7280; font-size: 13px;">Email us at <a href="mailto:support@afrisim.com" style="color: #059669; text-decoration: none;">support@afrisim.com</a></p>
                                        <p style="margin: 0 0 4px; color: #6b7280; font-size: 13px;">Visit our activation guide at <a href="https://afrisim.com/activate" style="color: #059669; text-decoration: none;">afrisim.com/activate</a></p>
                                        <p style="margin: 0 0 16px; color: #6b7280; font-size: 13px;">Or visit our help center at <a href="https://afrisim.com/help" style="color: #059669; text-decoration: none;">afrisim.com/help</a></p>
                                        <p style="margin: 0; color: #9ca3af; font-size: 12px;">&copy; {{ date('Y') }} AfriSIM. All rights reserved.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
