function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[24px] text-center w-[204.44px]">
        <p className="leading-[32px] whitespace-pre-wrap">Set Your Location</p>
      </div>
    </div>
  );
}

function Heading1Margin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[68.78px] pb-[8px] top-[184px]" data-name="Heading 1:margin">
      <Heading />
    </div>
  );
}

function Container() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-center left-1/2 max-w-[280px] px-[12.27px] top-[calc(50%+95.38px)]" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[69px] justify-center leading-[22.75px] relative shrink-0 text-[#64748b] text-[14px] text-center w-[255.46px] whitespace-pre-wrap">
        <p className="mb-0">We need your location to show available</p>
        <p className="mb-0">technicians and services in your</p>
        <p>neighborhood.</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[60px] text-[#136dec] text-[60px]">
        <p className="leading-[60px] whitespace-pre-wrap">location_on</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(19,109,236,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[128px]" data-name="Overlay">
      <Container1 />
      <div className="absolute inset-0 opacity-25 rounded-[9999px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-[rgba(19,109,236,0.2)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="absolute content-stretch flex flex-col h-[152px] items-start left-[107px] pb-[24px] top-[32px] w-[128px]" data-name="Margin">
      <Overlay />
    </div>
  );
}

function HeroIllustration() {
  return (
    <div className="absolute h-[324.25px] left-[24px] right-[24px] top-0" data-name="Hero Illustration">
      <Heading1Margin />
      <Container />
      <Margin />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#136dec] text-[20px] text-center w-[20px]">
        <p className="leading-[28px] whitespace-pre-wrap">my_location</p>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(19,109,236,0.1)] relative rounded-[9999px] shrink-0 size-[40px]" data-name="Overlay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Use Current Location</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Enable location access</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Heading1 />
        <Container4 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[24px] text-[#cbd5e1] text-[24px] text-center">
          <p className="leading-[24px] whitespace-pre-wrap">chevron_right</p>
        </div>
      </div>
    </div>
  );
}

function ButtonCurrentLocationAction() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Button - Current Location Action">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[17px] relative w-full">
          <Overlay1 />
          <Container3 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function ButtonCurrentLocationActionMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] pb-[24px] right-[24px] top-[324.25px]" data-name="Button - Current Location Action:margin">
      <ButtonCurrentLocationAction />
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="content-stretch flex flex-col items-start pl-[4px] relative w-full">
        <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[12px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[16px] whitespace-pre-wrap">Recent Locations</p>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[18px] w-[18px]">
        <p className="leading-[28px] whitespace-pre-wrap">history</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#334155] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">New York, NY</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">10001, United States</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[12px] relative w-full">
          <Container7 />
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[18px] w-[18px]">
        <p className="leading-[28px] whitespace-pre-wrap">history</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#334155] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">San Francisco, CA</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">94103, United States</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[12px] relative w-full">
          <Container11 />
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function RecentLocationsOptional() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Recent Locations (Optional)">
      <Heading2 />
      <Container6 />
    </div>
  );
}

function RecentLocationsOptionalMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] pb-[32px] right-[24px] top-[552.25px]" data-name="Recent Locations (Optional):margin">
      <RecentLocationsOptional />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[0.6px] uppercase w-[130.38px]">
        <p className="leading-[16px] whitespace-pre-wrap">Or enter manually</p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="content-stretch flex items-center py-[8px] relative shrink-0 w-full" data-name="Divider">
      <div className="flex-[1_0_0] h-px min-h-px min-w-px relative" data-name="Horizontal Divider">
        <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      </div>
      <Margin1 />
      <div className="flex-[1_0_0] h-px min-h-px min-w-px relative" data-name="Horizontal Divider">
        <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function DividerMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] pb-[24px] right-[24px] top-[422.25px]" data-name="Divider:margin">
      <Divider />
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-[280px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[19px] justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[14px] w-[195.23px]">
          <p className="leading-[normal] whitespace-pre-wrap">Enter city, zip code, or address</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[16px] pl-[45px] pr-[17px] pt-[15px] relative w-full">
          <Container15 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[24px] text-[#94a3b8] text-[24px]">
        <p className="leading-[24px] whitespace-pre-wrap">search</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-0 pl-[16px] top-0" data-name="Container">
      <Container17 />
    </div>
  );
}

function SearchInput() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Search Input">
      <Input />
      <Container16 />
    </div>
  );
}

function SearchInputMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] pb-[24px] right-[24px] top-[478.25px]" data-name="Search Input:margin">
      <SearchInput />
    </div>
  );
}

function MainContentScrollArea() {
  return (
    <div className="absolute inset-[104px_0_101px_0]" data-name="Main Content Scroll Area">
      <HeroIllustration />
      <ButtonCurrentLocationActionMargin />
      <RecentLocationsOptionalMargin />
      <DividerMargin />
      <SearchInputMargin />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white w-[134.48px]">
        <p className="leading-[24px] whitespace-pre-wrap">Confirm Location</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#136dec] relative rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(19,109,236,0.25),0px_4px_6px_-4px_rgba(19,109,236,0.25)] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] py-[14px] relative w-full">
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function StickyFooter() {
  return (
    <div className="absolute bg-[#f6f7f8] content-stretch flex flex-col items-start left-0 pb-[24px] pt-[25px] px-[24px] right-0 top-[783px]" data-name="Sticky Footer">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <Button2 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[24px] text-[#475569] text-[24px] text-center">
        <p className="leading-[24px] whitespace-pre-wrap">arrow_back</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container19 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex items-center left-0 pb-[16px] pl-[16px] pr-[334px] pt-[48px] right-0 top-0" data-name="Header">
      <Button3 />
    </div>
  );
}

export default function SetYourLocation() {
  return (
    <div className="bg-[#f6f7f8] relative shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Set Your Location">
      <MainContentScrollArea />
      <StickyFooter />
      <Header />
    </div>
  );
}