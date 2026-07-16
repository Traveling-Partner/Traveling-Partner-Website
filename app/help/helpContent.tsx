import React from "react";
import { HELP_ICONS } from "@/lib/helpAssets";

export interface HelpItem {
  id: number;
  question: string;
  answer: React.ReactNode;
}

export interface HelpCategory {
  id: string;
  title: string;
  iconSrc: string;
  browseDescription: string;
  items: HelpItem[];
}

const body = "text-[#5c5b55] text-[14px] sm:text-[15px] leading-[1.75]";
const bullet =
  "list-none space-y-3 text-[#5c5b55] text-[14px] sm:text-[15px] leading-[1.75]";

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-6">
      <span
        className="absolute left-0 top-[0.55em] h-2 w-2 rounded-full bg-[#FCE001]"
        aria-hidden="true"
      />
      {children}
    </li>
  );
}

export const helpCategories: HelpCategory[] = [
  {
    id: "vehicle",
    title: "Vehicle",
    iconSrc: HELP_ICONS.vehicle,
    browseDescription:
      "Everything about rides, vehicle registration, and driver requirements.",
    items: [
      {
        id: 1,
        question:
          "What are the vehicle requirements to become a Traveling Partner with my car?",
        answer: (
          <div className="space-y-4">
            <p className={body}>
              To become a Traveling Partner with your vehicle, ensure it aligns with
              safety standards, and reliability, and offers a positive user experience.
              Essential requirements typically include:
            </p>
            <ul className={bullet}>
              <BulletItem>
                Vehicle Suitability: Your vehicle should meet specific suitability
                criteria based on the services offered, ensuring quality experiences.
              </BulletItem>
              <BulletItem>
                Vehicle Condition: Maintaining a well-kept vehicle that passes safety
                inspections is crucial.
              </BulletItem>
              <BulletItem>
                Document Submission: Essential documents such as driver&apos;s license,
                car registration, and insurance are necessary.
              </BulletItem>
              <BulletItem>
                Variety of Vehicle Types: Partner vehicles vary to suit the different
                service types provided.
              </BulletItem>
            </ul>
          </div>
        ),
      },
      {
        id: 2,
        question: "How do I register my car as a Traveling Partner vehicle?",
        answer: (
          <div className="space-y-2">
            <p className={body}>Registering your vehicle is a simple process:</p>
            <p className={body}>I. Download the Traveling Partner app.</p>
            <p className={body}>
              II. Create an account and navigate to &quot;Add a Vehicle&quot; in your
              settings.
            </p>
            <p className={body}>
              III. Provide vehicle information and relevant documentation.
            </p>
            <p className={body}>
              IV. Upon verification, your car will be registered for Travel Partner
              services.
            </p>
          </div>
        ),
      },
      {
        id: 3,
        question: "How to know the estimated fare for your ride?",
        answer: (
          <p className={body}>
            Traveling Partner will not provide an estimated fare or formula to calculate
            the fare. Users have the autonomy to independently negotiate and finalize
            the fare at their discretion.
          </p>
        ),
      },
      {
        id: 4,
        question:
          "What are the different types of vehicles available on Traveling Partner?",
        answer: (
          <div className="space-y-4">
            <p className={body}>
              Traveling Partner offers a diverse range of vehicles to align with its
              distinct features:
            </p>
            <ul className={bullet}>
              <BulletItem>
                Delivery Vehicles: Optimized for secure and efficient delivery services,
                including vans, bikes, and compact cars suitable for various package
                sizes and types.
              </BulletItem>
              <BulletItem>
                Logistics Trucks: Designed for larger-scale logistics operations,
                providing ample space and reliability for transporting bulk items and
                cargo.
              </BulletItem>
              <BulletItem>
                Standard Commuter Cars: Ideal for everyday travel and general
                transportation services for the community.
              </BulletItem>
              <BulletItem>
                Premium Executive Cars: Offering luxurious and comfortable travel
                experiences for a higher-end user experience.
              </BulletItem>
            </ul>
            <p className={body}>
              These vehicle categories are well-suited for the various services provided
              by Traveling Partner, ensuring efficiency and effectiveness in the
              delivery, logistics, and transportation sectors.
            </p>
          </div>
        ),
      },
      {
        id: 5,
        question: "How to cancel a ride?",
        answer: (
          <p className={body}>
            To cancel a ride, use the Travel Partner app and tap &quot;Cancel Ride.&quot;
            Traveling Partner does not apply any cancellation fees based on the timing
            of the cancellation.
          </p>
        ),
      },
      {
        id: 6,
        question: "How to request a ride?",
        answer: (
          <div className="space-y-2">
            <p className={body}>
              Requesting a ride and negotiating the fare is a straightforward process on
              Traveling Partner:
            </p>
            <p className={body}>I. Open the Traveling Partner app.</p>
            <p className={body}>II. Enter pick-up and drop-off locations.</p>
            <p className={body}>III. Choose the desired vehicle type.</p>
            <p className={body}>IV. Initiate negotiation and confirm your request.</p>
            <p className={body}>
              V. Track your ride and finalize the negotiated fare.
            </p>
          </div>
        ),
      },
      {
        id: 7,
        question: "How to rate and review your driver?",
        answer: (
          <div className="space-y-2">
            <p className={body}>I. Post-ride, you can rate and review your driver:</p>
            <p className={body}>II. Access your ride history in the app.</p>
            <p className={body}>III. Select the completed ride for rating.</p>
            <p className={body}>
              IV. Assign a star rating and add comments if desired.
            </p>
            <p className={body}>
              V. Your feedback contributes to maintaining service standards for all
              users.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    iconSrc: HELP_ICONS.delivery,
    browseDescription:
      "Package delivery, tracking, and logistics support for every shipment.",
    items: [
      {
        id: 8,
        question: "How can I request a delivery service?",
        answer: (
          <div className="space-y-2">
            <p className={body}>
              Requesting a delivery service with Travelling Partner is a breeze:
            </p>
            <p className={body}>
              I. Open the Travelling Partner app on your device, where community members
              unite to assist one another, all within a commission-free model.
            </p>
            <p className={body}>
              II. Log in or create a new account, embracing our commitment to a
              commission-free experience.
            </p>
            <p className={body}>
              III. Navigate to the &quot;Delivery&quot; option within the app, fostering
              a supportive community network.
            </p>
            <p className={body}>
              IV. Provide your pickup and drop-off details along with any specific
              delivery instructions, allowing for a seamless exchange among our community
              members.
            </p>
            <p className={body}>
              V. Negotiate the delivery fee directly with your community member (Driver or
              Partner). Travelling Partner does not provide an Estimated Fare or any
              formula for calculating it. Our members are entirely independent and free to
              negotiate and finalize the fare.
            </p>
            <p className={body}>
              VI. Choose your desired delivery type, whether standard, express, or
              specialized, catering to your unique needs and preferences.
            </p>
            <p className={body}>
              VII. Confirm your booking and make the request, further nurturing a
              community-driven support system.
            </p>
          </div>
        ),
      },
      {
        id: 9,
        question: "How can I track my package during delivery?",
        answer: (
          <div className="space-y-2">
            <p className={body}>
              Stay connected with your package&apos;s journey using the Travelling Partner
              app:
            </p>
            <p className={body}>Open the app and select your active delivery.</p>
            <p className={body}>
              Observe the real-time location of your dedicated community member on the
              map, bringing your item closer to its destination.
            </p>
          </div>
        ),
      },
      {
        id: 10,
        question: "What should I do if there are issues with a delivery or package?",
        answer: (
          <div className="space-y-2">
            <p className={body}>
              In the event of any concerns regarding your delivery or package:
            </p>
            <p className={body}>
              I. Reach out to our responsive support team through the app&apos;s integrated
              support or help center feature.
            </p>
            <p className={body}>
              II. Share comprehensive details of the issue, allowing us to address it
              effectively within our community.
            </p>
            <p className={body}>
              III. Anticipate updates and guidance from our support team to ensure smooth
              resolution.
            </p>
            <p className={body}>
              IV. Please note that, due to our commission-free model, Travelling Partner
              cannot assume responsibility for the issues but can share user details when
              required to provide support and assist users within the community.
            </p>
          </div>
        ),
      },
      {
        id: 11,
        question: "What types of items can I deliver using Travelling Partner?",
        answer: (
          <div className="space-y-4">
            <p className={body}>Logistics Delivery:</p>
            <ul className={bullet}>
              <BulletItem>Large packages, bulky goods, and specialized equipment.</BulletItem>
              <BulletItem>Support for commercial and business deliveries.</BulletItem>
              <BulletItem>&quot;Share Delivery&quot; option for cost-effective logistics.</BulletItem>
            </ul>
            <p className={body}>Regular Delivery:</p>
            <ul className={bullet}>
              <BulletItem>Documents, letters, small packages.</BulletItem>
              <BulletItem>Food, groceries, retail orders, gifts, and flowers.</BulletItem>
              <BulletItem>Everyday items for community convenience.</BulletItem>
            </ul>
            <p className={body}>
              Specific guidelines may apply based on your location and local regulations,
              fostering a collaborative community spirit.
            </p>
          </div>
        ),
      },
      {
        id: 12,
        question:
          "What are the different types of delivery services available on Travelling Partner?",
        answer: (
          <div className="space-y-4">
            <p className={body}>Logistics Delivery:</p>
            <p className={body}>
              Specializes in large packages and specialized equipment. Features a sharing
              option for cost-effective and efficient community delivery.
            </p>
            <p className={body}>Regular Delivery:</p>
            <p className={body}>
              Includes everyday items, groceries, retail orders, and more, fostering mutual
              community support.
            </p>
            <p className={body}>
              Please note that specific guidelines or restrictions may apply based on
              location and regulations. Travelling Partner is dedicated to supporting a
              collaborative community.
            </p>
          </div>
        ),
      },
      {
        id: 13,
        question: "How do I know the estimated cost of my delivery?",
        answer: (
          <p className={body}>
            In alignment with our commission-free model and the independent spirit of our
            community, Travelling Partner refrains from providing estimated fares.
            Instead, our drivers and partners have the freedom to negotiate and finalize
            the fare for the services they provide, promoting a sense of self-reliance
            and mutual support.
          </p>
        ),
      },
    ],
  },
  {
    id: "payment-processing",
    title: "Payment Processing",
    iconSrc: HELP_ICONS.payment,
    browseDescription:
      "Payment methods, fares, and commission-free billing explained clearly.",
    items: [
      {
        id: 14,
        question: "Payment Processing",
        answer: (
          <div className="space-y-4">
            <p className={body}>
              At Traveling Partner, our payment processing is centered around a
              commission-free approach, providing you with a seamless and independent
              payment experience. Please note the following key points that distinguish
              our payment process:
            </p>
            <p className={body}>
              Commission-Free Platform: Traveling Partner operates on a commission-free
              model, ensuring that both Drivers and Partners have the freedom and
              independence to handle transactions in a way that best suits them.
            </p>
            <p className={body}>
              No Estimated Fare or Receipts: We do not provide estimated fares or a formula
              to calculate the fare, and we do not generate receipts for transactions.
              Instead, Users have the autonomy to negotiate and finalize payment
              arrangements independently and directly in the method of their choice,
              promoting flexibility and user empowerment.
            </p>
            <p className={body}>
              Independence for Negotiations: Our platform enables users to decide on
              payment terms, fostering a system that allows for direct negotiations after
              the service, providing a more personalized and flexible payment experience
              in the method preferred by each user.
            </p>
            <p className={body}>
              Empowering User Transactions: By giving autonomy to the users, we encourage
              direct communication and negotiation, ensuring a fair and transparent
              transaction process.
            </p>
            <p className={body}>
              Simplified Payment Handling: Traveling Partner simplifies the payment process
              by allowing transactions using the payment method of the user&apos;s choice
              at the end of a service, facilitating a more personalized and efficient
              payment method between both parties.
            </p>
            <p className={body}>
              The aim of Traveling Partner&apos;s commission-free approach is to foster a
              collaborative and flexible environment where users can negotiate and finalize
              transactions directly using the payment method that suits their preferences.
              This empowers users to manage their payment terms independently, promoting a
              more personalized and user-driven payment experience.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: "safety-and-security",
    title: "Safety & Security",
    iconSrc: HELP_ICONS.safety,
    browseDescription:
      "Safety features, reporting incidents, and security tips for every trip.",
    items: [
      {
        id: 15,
        question: "Ensuring Safety at Travel Partner in Pakistan",
        answer: (
          <div className="space-y-4">
            <p className={body}>
              At Travel Partner, our primary aim is to connect individuals within the same
              destination, fostering a supportive community. While we focus on a
              community-building approach, we still advocate for basic safety measures:
            </p>
            <p className={body}>
              Basic Safety Awareness: We encourage users to practice fundamental safety
              measures. Users should be mindful of their safety and consider basic
              precautions during travel.
            </p>
            <p className={body}>
              Supportive App Features: The Travel Partner app in Pakistan does offer some
              features for basic safety, such as sharing trip details and contacting
              emergency services within the app.
            </p>
            <p className={body}>
              User-Driven Ratings: Our system in Pakistan enables users to rate their
              experience. This user-driven feedback system helps maintain a reasonable
              level of service quality.
            </p>
            <p className={body}>
              Customer Support: We provide basic customer support to assist with general
              concerns or inquiries; however, it might not be available round the clock.
            </p>
          </div>
        ),
      },
      {
        id: 16,
        question: "Handling Safety Concerns During a Ride or Delivery",
        answer: (
          <div className="space-y-4">
            <p className={body}>
              If you feel uneasy during a ride or delivery, prioritize your comfort by
              considering these simple steps:
            </p>
            <p className={body}>
              Direct Communication: Attempt to communicate directly with the driver or
              partner through the app for minor issues.
            </p>
            <p className={body}>
              Trip Details Sharing: Share your trip information, including the
              driver&apos;s details and location, with a trusted individual to monitor your
              journey.
            </p>
            <p className={body}>
              Emergency Assistance: In case of immediate danger or needing emergency
              assistance, consider reaching out to local authorities or emergency services
              outside the app.
            </p>
            <p className={body}>
              Option to End the Ride: If you feel extremely uncomfortable or unsafe, you
              can choose to end the ride prematurely and leave the vehicle.
            </p>
          </div>
        ),
      },
      {
        id: 17,
        question: "Reporting Safety Incidents and Basic Safety Tips",
        answer: (
          <div className="space-y-4">
            <p className={body}>For any safety-related incidents in Pakistan:</p>
            <ul className={bullet}>
              <BulletItem>Go to your ride or delivery history within the Travel Partner app.</BulletItem>
              <BulletItem>Select the specific ride or delivery where the incident occurred.</BulletItem>
              <BulletItem>
                Use the &quot;Report an Issue&quot; option to provide details about the
                incident.
              </BulletItem>
              <BulletItem>
                Ensure your safety by being cautious, verifying the vehicle, sharing your
                trip details, and utilizing any basic safety features available within the
                app.
              </BulletItem>
            </ul>
            <p className={body}>
              Travel Partner in Pakistan aims to create a supportive environment while
              recognizing the importance of fundamental safety measures during daily
              travels
            </p>
          </div>
        ),
      },
    ],
  },
];

export const allHelpItems = helpCategories.flatMap((c) => c.items);
