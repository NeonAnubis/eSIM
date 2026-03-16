<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmed</title>
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

                    {{-- Confirmation Banner --}}
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center;">
                            <div style="display: inline-block; background-color: #ecfdf5; border-radius: 50%; width: 64px; height: 64px; line-height: 64px; font-size: 32px; margin-bottom: 16px;">&#10003;</div>
                            <h2 style="margin: 0 0 8px; color: #059669; font-size: 24px; font-weight: 700;">Order Confirmed!</h2>
                            <p style="margin: 0; color: #6b7280; font-size: 15px;">Thank you for your purchase. Your order has been received and is being processed.</p>
                        </td>
                    </tr>

                    {{-- Order Details --}}
                    <tr>
                        <td style="padding: 20px 40px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 20px;">
                                <tr>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #e5e7eb;">
                                        <span style="color: #6b7280; font-size: 13px;">Order Number</span><br>
                                        <strong style="color: #111827; font-size: 16px;">{{ $order->order_number }}</strong>
                                    </td>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #e5e7eb; text-align: right;">
                                        <span style="color: #6b7280; font-size: 13px;">Order Date</span><br>
                                        <strong style="color: #111827; font-size: 16px;">{{ $order->created_at->format('M d, Y') }}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 20px;">
                                        <span style="color: #6b7280; font-size: 13px;">Payment Method</span><br>
                                        <strong style="color: #111827; font-size: 16px;">{{ ucfirst($order->payment_method) }}</strong>
                                    </td>
                                    <td style="padding: 12px 20px; text-align: right;">
                                        <span style="color: #6b7280; font-size: 13px;">Status</span><br>
                                        <strong style="color: #059669; font-size: 16px;">{{ ucfirst($order->status) }}</strong>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    {{-- Items Table --}}
                    <tr>
                        <td style="padding: 20px 40px;">
                            <h3 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600;">Order Items</h3>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                                <tr style="background-color: #f9fafb;">
                                    <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb;">Plan</td>
                                    <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb; text-align: center;">Data</td>
                                    <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb; text-align: center;">Duration</td>
                                    <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb; text-align: right;">Price</td>
                                </tr>
                                @foreach ($order->items as $item)
                                <tr>
                                    <td style="padding: 16px; border-bottom: 1px solid #f3f4f6;">
                                        <strong style="color: #111827; font-size: 14px;">{{ $item->plan->name }}</strong>
                                        @if ($item->plan->country)
                                        <br><span style="color: #6b7280; font-size: 13px;">{{ $item->plan->country->name }}</span>
                                        @endif
                                    </td>
                                    <td style="padding: 16px; border-bottom: 1px solid #f3f4f6; text-align: center; color: #374151; font-size: 14px;">{{ $item->plan->data_amount }}</td>
                                    <td style="padding: 16px; border-bottom: 1px solid #f3f4f6; text-align: center; color: #374151; font-size: 14px;">{{ $item->plan->duration_days }} days</td>
                                    <td style="padding: 16px; border-bottom: 1px solid #f3f4f6; text-align: right; color: #111827; font-size: 14px; font-weight: 600;">${{ number_format($item->total_price, 2) }}</td>
                                </tr>
                                @endforeach
                            </table>
                        </td>
                    </tr>

                    {{-- Totals --}}
                    <tr>
                        <td style="padding: 0 40px 20px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding: 8px 16px; color: #6b7280; font-size: 14px;">Subtotal</td>
                                    <td style="padding: 8px 16px; text-align: right; color: #374151; font-size: 14px;">${{ number_format($order->subtotal, 2) }}</td>
                                </tr>
                                @if ($order->tax > 0)
                                <tr>
                                    <td style="padding: 8px 16px; color: #6b7280; font-size: 14px;">Tax</td>
                                    <td style="padding: 8px 16px; text-align: right; color: #374151; font-size: 14px;">${{ number_format($order->tax, 2) }}</td>
                                </tr>
                                @endif
                                <tr>
                                    <td style="padding: 12px 16px; color: #111827; font-size: 18px; font-weight: 700; border-top: 2px solid #e5e7eb;">Total</td>
                                    <td style="padding: 12px 16px; text-align: right; color: #059669; font-size: 18px; font-weight: 700; border-top: 2px solid #e5e7eb;">${{ number_format($order->total, 2) }} {{ $order->currency }}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    {{-- Next Steps --}}
                    <tr>
                        <td style="padding: 20px 40px;">
                            <div style="background-color: #f0fdf4; border-left: 4px solid #059669; border-radius: 0 8px 8px 0; padding: 20px 24px;">
                                <h3 style="margin: 0 0 12px; color: #059669; font-size: 16px; font-weight: 600;">What Happens Next?</h3>
                                <ol style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px; line-height: 1.8;">
                                    <li>You will receive a separate email with your eSIM details and QR code.</li>
                                    <li>Scan the QR code with your device to install the eSIM profile.</li>
                                    <li>Activate your eSIM when you arrive at your destination.</li>
                                    <li>Enjoy seamless connectivity across Africa!</li>
                                </ol>
                            </div>
                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td style="background-color: #f9fafb; padding: 32px 40px; border-top: 1px solid #e5e7eb;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="margin: 0 0 8px; color: #059669; font-size: 16px; font-weight: 600;">Need Help?</p>
                                        <p style="margin: 0 0 4px; color: #6b7280; font-size: 13px;">Email us at <a href="mailto:support@afrisim.com" style="color: #059669; text-decoration: none;">support@afrisim.com</a></p>
                                        <p style="margin: 0 0 16px; color: #6b7280; font-size: 13px;">Visit our help center at <a href="https://afrisim.com/help" style="color: #059669; text-decoration: none;">afrisim.com/help</a></p>
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
