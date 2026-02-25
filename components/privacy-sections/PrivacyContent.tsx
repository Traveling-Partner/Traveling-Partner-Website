// components/Privacy/PrivacyContent.tsx
import React from "react";

export default function PrivacyContent() {
  return (
    <main className="w-[85%] mx-auto max-w-5xl pb-24">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/20 px-4 py-2 rounded-full mb-6">
          <svg className="w-4 h-4 text-[#fdb813]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-[#1a1a1a] text-sm font-semibold uppercase tracking-wider">Privacy Policy</span>
        </div>
        <h1 className="uppercase text-[40px] font-bold text-[#1a1a1a] max-md:text-[28px]">
          Your Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Protection</span>
        </h1>
        <div className="w-32 h-1.5 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full mx-auto mt-4"></div>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-3xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] overflow-hidden border border-gray-100">
        {/* Section 1 */}
        <section className="p-8 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fce001] to-[#fdb813] flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-lg">01</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">
                Information We Collect
              </h2>
              <ul className="space-y-4 text-gray-600 leading-relaxed">
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <span>To deliver a personalized and efficient experience, we collect various types of information:</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-[#1a1a1a]">Personal Information:</strong>
                    <p className="mt-1">This encompasses your name, contact details, payment information, and, if required, identification documents to comply with local regulations.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-[#1a1a1a]">Location Data:</strong>
                    <p className="mt-1">We rely on your location to match you swiftly with nearby ride requests, facilitating convenience for Partners and helping Drivers optimize routes. You have the option to disable location tracking but bear in mind that this may affect certain functionalities.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-[#1a1a1a]">Transaction Data:</strong>
                    <p className="mt-1">We gather information related to your ride bookings, payments, and comprehensive trip history, which helps us improve and customize your experience.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="p-8 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fce001] to-[#fdb813] flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-lg">02</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">
                How We Use Your Information
              </h2>
              <ul className="space-y-4 text-gray-600 leading-relaxed">
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <span>Your data plays a pivotal role in enhancing your Travel Partner experience:</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-[#1a1a1a]">Providing Services:</strong>
                    <p className="mt-1">Your information is critical for facilitating ride bookings, delivery services, logistics, and fuel cost savings within and between cities.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-[#1a1a1a]">Payment Processing:</strong>
                    <p className="mt-1">We utilize your data for secure and transparent financial transactions, ensuring your peace of mind with each payment.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-[#1a1a1a]">Improving Services:</strong>
                    <p className="mt-1">We continually enhance our services based on your interactions, develop innovative features, and personalize your experience to better serve your unique needs.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-[#1a1a1a]">Safety and Security:</strong>
                    <p className="mt-1">Our unwavering commitment to safety includes an innovative feature that enables rides to be provided on behalf of a specific gender, ensuring a comfortable and secure journey for all.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="p-8 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fce001] to-[#fdb813] flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-lg">03</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">
                Data Sharing
              </h2>
              <ul className="space-y-4 text-gray-600 leading-relaxed">
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <span>To provide you with a seamless experience, we may share your information with specific parties:</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-[#1a1a1a]">Drivers:</strong>
                    <p className="mt-1">Sharing information with drivers is essential to facilitate ride bookings, delivery services, and logistics, ensuring efficient transportation.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-[#1a1a1a]">Payment Processors:</strong>
                    <p className="mt-1">Your data is used by payment processors to securely process payments, adding a layer of transparency to all financial transactions.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-[#1a1a1a]">Third-party Service Providers:</strong>
                    <p className="mt-1">Our services integrate with essential third-party APIs, Maps, Twilio, AWS S3 buckets, and other components crucial to our operations.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-[#1a1a1a]">Law Enforcement:</strong>
                    <p className="mt-1">We may share information when required by law or to protect our rights, safety, and security.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="p-8 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fce001] to-[#fdb813] flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-lg">04</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">
                Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We take the security of your data seriously and employ industry-standard measures to protect it from unauthorized access, disclosure, alteration, or destruction. Our encryption protocols and rigorous security practices are in place to ensure your information remains safe.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="p-8 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fce001] to-[#fdb813] flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-lg">05</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">
                Your Choices
              </h2>
              <ul className="space-y-4 text-gray-600 leading-relaxed">
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <span>Your control is paramount:</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-[#1a1a1a]">Review and Update:</strong>
                    <p className="mt-1">You have the power to manage your personal information in your account settings, ensuring it remains current and accurate.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="text-[#1a1a1a]">Location Tracking:</strong>
                    <p className="mt-1">The choice is yours. Option to enable or disable location tracking to suit your preferences and needs.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="p-8 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fce001] to-[#fdb813] flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-lg">06</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">
                Third-party Links
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Please note that our services may include links to third-party websites or services. These entities have their privacy practices, separate from ours. As such, we encourage you to review their privacy policies when using their services.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section className="p-8 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fce001] to-[#fdb813] flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-lg">07</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">
                Changes to this Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To keep you informed and updated, we may periodically update this Privacy Policy to reflect changes in our practices, adhere to evolving legal requirements, or address operational needs. Rest assured, you will receive notifications of significant changes.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8 - Contact */}
        <section className="p-8 bg-gradient-to-br from-[#fce001]/5 to-[#fdb813]/5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fce001] to-[#fdb813] flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-lg">08</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                For questions, concerns, or inquiries related to these Terms and Conditions, please contact us at (Your Contact Information).
              </p>
              <div className="p-4 bg-white rounded-xl border border-[#fce001]/20">
                <p className="text-[#1a1a1a] font-medium">
                  Thank you for choosing Travel Partner. We are dedicated to streamlining transportation, logistics, and trip planning while ensuring a secure and efficient experience for both Drivers and Partners.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}