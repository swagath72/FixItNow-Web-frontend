import imgProfessionalPlumberInUniformPortrait from "figma:asset/6d4aef53b5506366d6276406b4eaa61cf96c145f.png";
import imgElectricianWomanWithTools from "figma:asset/0ca8cf2715b3cf8c6fa0e25eb07cc95b973a9256.png";
import imgHandymanSmilingAtCamera from "figma:asset/43765627fcdd3ca332c6f58bd7eb8703cfdb2a88.png";

function OverlayOverlayBlur() {
  return (
    <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.2)] content-stretch flex flex-col items-start p-[6px] relative rounded-[8px] shrink-0" data-name="Overlay+OverlayBlur">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white w-[18px]">
        <p className="leading-[28px] whitespace-pre-wrap">smart_toy</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] tracking-[0.6px] uppercase w-[90.2px]">
        <p className="leading-[16px] whitespace-pre-wrap">24/7 Support</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-0 right-[16px] top-0" data-name="Container">
      <OverlayOverlayBlur />
      <Container4 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-[16px] top-[48px]" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[23px] justify-center leading-[0] relative shrink-0 text-[18px] text-white w-[183.39px]">
        <p className="leading-[22.5px] whitespace-pre-wrap">Need help right now?</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-[16px] top-[74.5px]" data-name="Container">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium h-[40px] justify-center leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-[241.8px] whitespace-pre-wrap">
        <p className="mb-0">Ask our AI assistant about booking or</p>
        <p>payments.</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] h-[114.5px] min-h-px min-w-px relative" data-name="Container">
      <Container3 />
      <Heading2 />
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[24px] text-[#0b5ed7] text-[24px]">
        <p className="leading-[24px] whitespace-pre-wrap">arrow_forward</p>
      </div>
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center relative rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 size-[40px]" data-name="Background+Shadow">
      <Container7 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <BackgroundShadow />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container6 />
    </div>
  );
}

function AiSupportCard() {
  return (
    <div className="relative rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(19,109,236,0.2),0px_4px_6px_-4px_rgba(19,109,236,0.2)] shrink-0 w-full" data-name="AI Support Card" style={{ backgroundImage: "linear-gradient(156.182deg, rgb(19, 109, 236) 0%, rgb(11, 94, 215) 100%)" }}>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[20px] relative w-full">
          <div className="absolute bg-[rgba(255,255,255,0.1)] blur-[20px] right-[-16px] rounded-[9999px] size-[128px] top-[-16px]" data-name="Abstract Background Pattern" />
          <div className="absolute bg-[rgba(0,0,0,0.05)] blur-[12px] bottom-[-16px] left-[-16px] rounded-[9999px] size-[96px]" data-name="Overlay+Blur" />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 2">
      <div className="content-stretch flex flex-col items-start px-[4px] relative w-full">
        <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[14px] tracking-[0.7px] uppercase w-full">
          <p className="leading-[20px] whitespace-pre-wrap">Active Works</p>
        </div>
      </div>
    </div>
  );
}

function ProfessionalPlumberInUniformPortrait() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[56px]" data-name="Professional plumber in uniform portrait">
      <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgProfessionalPlumberInUniformPortrait} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <ProfessionalPlumberInUniformPortrait />
      <div className="absolute bg-[#22c55e] bottom-0 right-0 rounded-[9999px] size-[14px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[16px] w-full">
        <p className="leading-[24px] whitespace-pre-wrap">Mike The Plumber</p>
      </div>
    </div>
  );
}

function Pr12ToAvoidOverlapWithTimeBadge() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="pr-12 to avoid overlap with time/badge">
      <Heading3 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#dbeafe] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#1d4ed8] text-[10px] w-[65.48px]">
        <p className="leading-[15px] whitespace-pre-wrap">IN PROGRESS</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#64748b] text-[12px] w-[108.27px]">
        <p className="leading-[16px] whitespace-pre-wrap">• Leak Repair #492</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Background />
      <Container12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pt-[2px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">{`I'll be there in about 10 mins, traffi…`}</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col gap-[2px] items-start pr-[48px] relative w-full">
        <Pr12ToAvoidOverlapWithTimeBadge />
        <Container11 />
        <Container13 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#136dec] text-[12px] w-[51.5px]">
        <p className="leading-[16px] whitespace-pre-wrap">10:42 AM</p>
      </div>
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="bg-[#136dec] content-stretch flex items-center justify-center pb-[3px] pt-[2px] relative rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(19,109,236,0.3)] shrink-0 size-[20px]" data-name="Background+Shadow">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-center text-white w-[5.96px]">
        <p className="leading-[15px] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function StatusIndicatorDot() {
  return (
    <div className="absolute bottom-[28.49%] content-stretch flex flex-col gap-[4px] items-end right-[12px] top-[28.49%]" data-name="Status Indicator Dot">
      <Container14 />
      <BackgroundShadow1 />
    </div>
  );
}

function ChatItem1Unread() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[12px] relative rounded-[12px] shrink-0 w-[374px]" data-name="Chat Item 1 (Unread)">
      <Container9 />
      <Container10 />
      <StatusIndicatorDot />
    </div>
  );
}

function ElectricianWomanWithTools() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[56px]" data-name="Electrician woman with tools">
      <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgElectricianWomanWithTools} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <ElectricianWomanWithTools />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[16px] w-full">
        <p className="leading-[24px] whitespace-pre-wrap">Sarah (Electrician)</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Heading4 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#fef3c7] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#b45309] text-[10px] w-[54.33px]">
        <p className="leading-[15px] whitespace-pre-wrap">UPCOMING</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#64748b] text-[12px] w-[117.3px]">
        <p className="leading-[16px] whitespace-pre-wrap">• Full House Rewiring</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Background1 />
      <Container19 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pt-[2px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#64748b] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Does Tuesday at 2 PM still work for…</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col gap-[2px] items-start pr-[48px] relative w-full">
        <Container17 />
        <Container18 />
        <Container20 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[12px] w-[55.56px]">
        <p className="leading-[16px] whitespace-pre-wrap">Yesterday</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bottom-[41.4%] content-stretch flex flex-col items-end right-[12px] top-[41.4%]" data-name="Container">
      <Container22 />
    </div>
  );
}

function ChatItem2Read() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[12px] relative rounded-[12px] shrink-0 w-[374px]" data-name="Chat Item 2 (Read)">
      <Container15 />
      <Container16 />
      <Container21 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[362px]" data-name="Container">
      <ChatItem1Unread />
      <ChatItem2Read />
    </div>
  );
}

function ActiveBookingsSection() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-end relative shrink-0 w-full" data-name="Active Bookings Section">
      <Heading1 />
      <Container8 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 2">
      <div className="content-stretch flex flex-col items-start px-[4px] relative w-full">
        <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[14px] tracking-[0.7px] uppercase w-full">
          <p className="leading-[20px] whitespace-pre-wrap">Past History</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center justify-center pb-[14.5px] pt-[13.5px] px-[2px] relative rounded-[9999px] shrink-0 size-[56px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#64748b] text-[20px] text-center w-[25.31px]">
        <p className="leading-[28px] whitespace-pre-wrap">GL</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <BackgroundBorderShadow />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#334155] text-[16px] w-full">
        <p className="leading-[24px] whitespace-pre-wrap">Green Lawn Care</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Heading6 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#475569] text-[10px] w-[59.92px]">
        <p className="leading-[15px] whitespace-pre-wrap">COMPLETED</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#64748b] text-[12px] w-[130.47px]">
        <p className="leading-[16px] whitespace-pre-wrap">• Monthly Maintenance</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Background2 />
      <Container28 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pt-[2px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#64748b] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Thanks for the great review!</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col gap-[2px] items-start pr-[48px] relative w-full">
        <Container26 />
        <Container27 />
        <Container29 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[12px] w-[35.89px]">
        <p className="leading-[16px] whitespace-pre-wrap">Sep 12</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bottom-[41.4%] content-stretch flex flex-col items-end right-[12px] top-[41.4%]" data-name="Container">
      <Container31 />
    </div>
  );
}

function PastItem() {
  return (
    <div className="content-stretch flex gap-[16px] items-center opacity-80 p-[12px] relative rounded-[12px] shrink-0 w-[374px]" data-name="Past Item 1">
      <Container24 />
      <Container25 />
      <Container30 />
    </div>
  );
}

function HandymanSmilingAtCamera() {
  return (
    <div className="opacity-80 pointer-events-none relative rounded-[9999px] shrink-0 size-[56px]" data-name="Handyman smiling at camera">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgHandymanSmilingAtCamera} />
        </div>
        <div className="absolute bg-white inset-0 mix-blend-saturation rounded-[9999px]" />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <HandymanSmilingAtCamera />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#334155] text-[16px] w-full">
        <p className="leading-[24px] whitespace-pre-wrap">{`Dave's Repairs`}</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Heading7 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#475569] text-[10px] w-[59.92px]">
        <p className="leading-[15px] whitespace-pre-wrap">COMPLETED</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#64748b] text-[12px] w-[84.38px]">
        <p className="leading-[16px] whitespace-pre-wrap">• Drywall Patch</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Background3 />
      <Container36 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pt-[2px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#64748b] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Can you send the receipt?</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col gap-[2px] items-start pr-[48px] relative w-full">
        <Container34 />
        <Container35 />
        <Container37 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[12px] w-[38.47px]">
        <p className="leading-[16px] whitespace-pre-wrap">Aug 24</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute bottom-[41.4%] content-stretch flex flex-col items-end right-[12px] top-[41.4%]" data-name="Container">
      <Container39 />
    </div>
  );
}

function PastItem1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center opacity-80 p-[12px] relative rounded-[12px] shrink-0 w-[374px]" data-name="Past Item 2">
      <Container32 />
      <Container33 />
      <Container38 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[362px]" data-name="Container">
      <PastItem />
      <PastItem1 />
    </div>
  );
}

function PastWorksSection() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-end pt-[8px] relative shrink-0 w-full" data-name="Past Works Section">
      <Heading5 />
      <Container23 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[20px] relative w-full">
        <AiSupportCard />
        <ActiveBookingsSection />
        <PastWorksSection />
      </div>
    </div>
  );
}

function MainContentScrollable() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[121px_0_68.5px_0] items-start pb-[96px]" data-name="Main Content (Scrollable)">
      <Container />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.75px] w-[140.28px]">
        <p className="leading-[36px] whitespace-pre-wrap">Messages</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[24px] text-center w-[24px]">
        <p className="leading-[32px] whitespace-pre-wrap">search</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container42 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[24px] text-center w-[24px]">
        <p className="leading-[32px] whitespace-pre-wrap">edit_note</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container43 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Heading />
        <Container41 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-white content-stretch flex flex-col items-start left-0 pb-[25px] pt-[48px] px-[20px] right-0 top-0" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <Container40 />
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center leading-[0] relative shrink-0 text-[#94a3b8] text-center w-[64px]" data-name="Button">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] h-[32px] justify-center not-italic relative shrink-0 text-[24px] w-[24px]">
        <p className="leading-[32px] whitespace-pre-wrap">home</p>
      </div>
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium h-[15px] justify-center relative shrink-0 text-[10px] w-[27.48px]">
        <p className="leading-[15px] whitespace-pre-wrap">Home</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center leading-[0] relative shrink-0 text-[#94a3b8] text-center w-[64px]" data-name="Button">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] h-[32px] justify-center not-italic relative shrink-0 text-[24px] w-[24px]">
        <p className="leading-[32px] whitespace-pre-wrap">calendar_today</p>
      </div>
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium h-[15px] justify-center relative shrink-0 text-[10px] w-[43.16px]">
        <p className="leading-[15px] whitespace-pre-wrap">Bookings</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 w-[64px]" data-name="Button">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#136dec] text-[24px] text-center w-[24px]">
        <p className="leading-[32px] whitespace-pre-wrap">chat_bubble</p>
      </div>
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#136dec] text-[10px] text-center w-[48.77px]">
        <p className="leading-[15px] whitespace-pre-wrap">Messages</p>
      </div>
      <div className="absolute bg-[#ef4444] right-[12px] rounded-[9999px] size-[10px] top-0" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center leading-[0] relative shrink-0 text-[#94a3b8] text-center w-[64px]" data-name="Button">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] h-[32px] justify-center not-italic relative shrink-0 text-[24px] w-[24px]">
        <p className="leading-[32px] whitespace-pre-wrap">person</p>
      </div>
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium h-[15px] justify-center relative shrink-0 text-[10px] w-[30.47px]">
        <p className="leading-[15px] whitespace-pre-wrap">Profile</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[0.03px] relative w-full">
          <Button2 />
          <Button3 />
          <Button4 />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function BottomNavigation() {
  return (
    <div className="absolute bg-white left-0 right-0 top-[800px]" data-name="Bottom Navigation">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-[20px] pt-[13px] px-[24px] relative rounded-[inherit] w-full">
        <Container44 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.02)]" />
    </div>
  );
}

export default function Messages() {
  return (
    <div className="relative shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Messages" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), linear-gradient(90deg, rgb(246, 247, 248) 0%, rgb(246, 247, 248) 100%)" }}>
      <MainContentScrollable />
      <Header />
      <BottomNavigation />
    </div>
  );
}