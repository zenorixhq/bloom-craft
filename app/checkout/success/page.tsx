"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { storeConfig } from "@/config/store.config";
import {
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  PackageCheck,
  Video,
  ShieldCheck,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "BC-58492";
  const paymentId = searchParams.get("paymentId") || "";
  const rawTotal = searchParams.get("total") || "999";
  const cleanedTotal = rawTotal.replace(/^[₹\s]+/, "");
  const displayTotal = `₹${cleanedTotal}`;
  const phone = searchParams.get("phone") || "";
  const method = searchParams.get("method") || (paymentId ? "razorpay" : "whatsapp");

  const [copied, setCopied] = useState(false);
  const isOnlinePayment = method === "razorpay" || !!paymentId;
  const whatsappPhone = storeConfig.brand.contact.whatsappNumber || "919876543210";

  useEffect(() => {
    if (typeof window === "undefined" || !orderNumber) return;
    try {
      const prevOrdersStr = localStorage.getItem("bloomcraft_placed_orders");
      const prevOrders = prevOrdersStr ? JSON.parse(prevOrdersStr) : [];
      const exists = prevOrders.some((o: any) => o.orderNumber === orderNumber);
      if (!exists) {
        const numericTotal = parseFloat(cleanedTotal) || 0;
        const newRecord = {
          id: `ord_${orderNumber}`,
          orderNumber,
          createdAt: new Date().toISOString(),
          status: "processing",
          paymentStatus: isOnlinePayment ? "paid" : "pending",
          paymentMethod: method,
          razorpayPaymentId: paymentId,
          customer: {
            fullName: "Valued Collector",
            phone: phone,
          },
          items: [],
          grandTotal: numericTotal,
          trackingNumber: `DTDC-BC-${(parseInt(orderNumber.replace(/\D/g, "") || "100000", 10) * 7).toString().slice(0, 6)}`,
        };
        localStorage.setItem("bloomcraft_placed_orders", JSON.stringify([newRecord, ...prevOrders]));
      }
      if (phone) {
        localStorage.setItem("bloomcraft_customer_phone", phone);
      }
      localStorage.setItem("bloomcraft_has_purchased", "true");
    } catch (e) {}
  }, [orderNumber, paymentId, cleanedTotal, phone, method, isOnlinePayment]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-8 font-glacial">
      {/* Success Badge */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <span className="text-xs uppercase tracking-widest font-bold text-[#214332]">
          {isOnlinePayment ? "Payment Verified & Order Confirmed" : "Order Sent via WhatsApp"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-foreground">
          Thank you for choosing Bloom Craft!
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {isOnlinePayment
            ? "Your payment was processed securely via Razorpay. We are getting your handcrafted stationery and gift hampers lovingly packed for dispatch."
            : "Your order details have been prepared for our WhatsApp atelier. We will confirm your items and tracking code."}
        </p>
      </div>

      {/* Order Summary Card */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-border">
          <div>
            <span className="text-xs text-muted-foreground block">Order Number</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-bold text-foreground font-mono">{orderNumber}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="p-1 text-muted-foreground hover:text-foreground"
                title="Copy order number"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div>
            <span className="text-xs text-muted-foreground block">Total Amount</span>
            <p className="text-lg font-bold text-foreground mt-0.5">{displayTotal}</p>
          </div>

          <div>
            <span className="text-xs text-muted-foreground block">Payment Status</span>
            <p className="text-sm font-bold text-emerald-700 flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isOnlinePayment ? "Paid via Razorpay" : "Pending UPI Confirmation"}</span>
            </p>
            {paymentId && (
              <span className="text-[10px] text-muted-foreground font-mono block mt-0.5">
                Ref: {paymentId}
              </span>
            )}
          </div>
        </div>

        {/* Mandatory Policy Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-xs uppercase tracking-wide">
            <Video className="w-4 h-4 text-amber-600" />
            <span>Customer Note: 360° Unboxing Video 📦</span>
          </div>
          <p className="text-xs text-amber-800 dark:text-amber-300/90 leading-relaxed">
            Please make sure to record an uninterrupted 360-degree unboxing video from the time you open the outer courier box. This helps us ensure immediate transit replacement if any delicate ceramic or wax item is damaged.
          </p>
        </div>

        {/* WhatsApp Communication Card */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-[#EEF3F0] border border-[#214332]/20">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-[#18221D]">Need custom gift note or shipping updates?</h4>
            <p className="text-xs text-[#3D4942]">
              Connect directly with our gifting concierge on WhatsApp with your Order ID.
            </p>
          </div>
          <a
            href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
              `Hi Bloom Craft! I just placed order #${orderNumber} and would like to check on delivery.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#1fb354] transition-all shrink-0 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/products"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#214332] text-white text-sm font-semibold hover:bg-[#162f23] transition-all shadow-md"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/account"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-stone-300 text-stone-700 hover:text-stone-900 hover:border-stone-400 text-sm font-semibold transition-all"
        >
          <span>View My Orders</span>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-24 text-center">Loading order confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
