interface BenefitItemProps {
  text: string;
}

export default function BenefitItem({ text }: BenefitItemProps) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="relative flex-shrink-0 w-8 h-8 mt-1">
        <div className="absolute inset-0 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-lg flex items-center justify-center shadow-md">
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <p className="text-[#1a1a1a] text-lg leading-relaxed font-medium group-hover:text-black transition-colors duration-300">{text}</p>
    </div>
  );
}