import imgGoogleLogo from "figma:asset/9d45a45e71367f9d8f750c26b4e7539f6f0f81ff.png";
import imgAppleLogo from "figma:asset/fd775223d251d7cd3df93a5aeafa7db87d3840e7.png";

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[12px] w-[23.7px]">
        <p className="leading-[16px] whitespace-pre-wrap">9:41</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#0f172a] text-[16px]">
        <p className="leading-[16px] whitespace-pre-wrap">signal_cellular_alt</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#0f172a] text-[16px]">
        <p className="leading-[16px] whitespace-pre-wrap">wifi</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#0f172a] text-[16px]">
        <p className="leading-[16px] whitespace-pre-wrap">battery_full</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function StatusBarPlaceholderIOsStyle() {
  return (
    <div className="h-[48px] relative shrink-0 w-[356px]" data-name="Status Bar Placeholder (iOS Style)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-[8px] px-[24px] relative size-full">
        <Container />
        <Container1 />
      </div>
    </div>
  );
}

function ActiveTabBackgroundIndicator() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start justify-center left-0 p-[4px] right-1/2 top-0" data-name="Active Tab Background Indicator">
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full" data-name="Background+Shadow" />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px py-[8px] relative" data-name="Button">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#136dec] text-[14px] text-center w-[66.47px]">
        <p className="leading-[20px] whitespace-pre-wrap">Customer</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px py-[8px] relative" data-name="Button">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] relative shrink-0 text-[#64748b] text-[14px] text-center w-[49.09px]">
        <p className="leading-[20px] whitespace-pre-wrap">Partner</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f1f5f9] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[4px] relative w-full">
          <ActiveTabBackgroundIndicator />
          <Button />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function RoleToggle() {
  return (
    <div className="relative shrink-0 w-[356px]" data-name="Role Toggle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[8px] pt-[16px] px-[24px] relative w-full">
        <Background />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#136dec] text-[36px] text-center w-[36px]">
        <p className="leading-[40px] whitespace-pre-wrap">handyman</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="-translate-x-1/2 absolute bg-[rgba(19,109,236,0.1)] content-stretch flex items-center justify-center left-1/2 rounded-[16px] size-[64px] top-0" data-name="Overlay">
      <Container5 />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-[88px]" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[24px] text-center tracking-[-0.6px] w-[220.75px]">
        <p className="leading-[32px] whitespace-pre-wrap">Service at your door</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 pb-[0.625px] right-0 top-[126.88px]" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[46px] justify-center leading-[22.75px] relative shrink-0 text-[#64748b] text-[14px] text-center w-[304.94px] whitespace-pre-wrap">
        <p className="mb-0">Enter your mobile number to log in or sign up for</p>
        <p>instant home services.</p>
      </div>
    </div>
  );
}

function BrandingArea() {
  return (
    <div className="h-[173.5px] relative shrink-0 w-full" data-name="Branding Area">
      <Overlay />
      <Heading />
      <Container6 />
    </div>
  );
}

function BrandingAreaMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] pb-[40px] right-[24px] top-[32px]" data-name="Branding Area:margin">
      <BrandingArea />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Mobile Number</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-[192px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[18px] w-[119.89px]">
          <p className="leading-[normal] whitespace-pre-wrap">000 000 0000</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[12px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[98px] pr-[18px] py-[20px] relative w-full">
          <Container9 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] text-center w-[13.16px]">
          <p className="leading-[28px] whitespace-pre-wrap">🇺🇸</p>
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] relative shrink-0 text-[#334155] text-[16px] text-center w-[15.7px]">
          <p className="leading-[24px] whitespace-pre-wrap">+1</p>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] text-center w-[14px]">
          <p className="leading-[20px] whitespace-pre-wrap">expand_more</p>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pl-[8px] pr-[13px] py-[4px] relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-r border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container11 />
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-0 pl-[12px] top-0" data-name="Container">
      <Button2 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container10 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Label">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white w-[177.44px]">
        <p className="leading-[24px] whitespace-pre-wrap">Send Verification Code</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">arrow_forward</p>
      </div>
    </div>
  );
}

function ButtonPrimaryAction() {
  return (
    <div className="bg-[#136dec] content-stretch flex gap-[8px] items-center justify-center overflow-clip py-[16px] relative rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(19,109,236,0.3),0px_4px_6px_-4px_rgba(19,109,236,0.3)] shrink-0 w-full" data-name="Button - Primary Action">
      <Container14 />
      <Container15 />
    </div>
  );
}

function InputForm() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[24px] right-[24px] top-[245.5px]" data-name="Input Form">
      <Label />
      <ButtonPrimaryAction />
    </div>
  );
}

function GoogleLogo() {
  return (
    <div className="max-w-[146px] relative shrink-0 size-[20px]" data-name="Google Logo">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgGoogleLogo} />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px px-px py-[13px] relative rounded-[12px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <GoogleLogo />
    </div>
  );
}

function AppleLogo() {
  return (
    <div className="max-w-[146px] relative shrink-0 size-[20px]" data-name="Apple Logo">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAppleLogo} />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px px-px py-[13px] relative rounded-[12px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <AppleLogo />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Button3 />
      <Button4 />
    </div>
  );
}

function Margin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] pb-[24px] right-[24px] top-[512.6px]" data-name="Margin">
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[39px] justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[12px] text-center w-[266.36px] whitespace-pre-wrap">
        <p className="mb-0">
          <span className="leading-[19.5px]">{`By continuing, you agree to our `}</span>
          <span className="font-['Manrope:Medium',sans-serif] font-medium leading-[19.5px] text-[#136dec]">Terms of Service</span>
        </p>
        <p>
          <span className="leading-[19.5px]">{`and `}</span>
          <span className="font-['Manrope:Medium',sans-serif] font-medium leading-[19.5px] text-[#136dec]">Privacy Policy</span>
          <span className="leading-[19.5px]">.</span>
        </p>
      </div>
    </div>
  );
}

function LegalFooter() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] px-[16px] right-[24px] top-[582.6px]" data-name="Legal Footer">
      <Container17 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex inset-0 items-center justify-center" data-name="Container">
      <div className="flex-[1_0_0] h-px min-h-px min-w-px relative" data-name="Horizontal Divider">
        <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[8px] relative self-stretch shrink-0" data-name="Background">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[14px] w-[106.55px]">
        <p className="leading-[20px] whitespace-pre-wrap">Or continue with</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Background1 />
    </div>
  );
}

function SocialLoginAlternativesOptionalButGoodForUx() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] py-[16px] right-[24px] top-[460.6px]" data-name="Social Login / Alternatives (Optional but good for UX)">
      <Container18 />
      <Container19 />
    </div>
  );
}

function MainContentArea() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[356px]" data-name="Main Content Area">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <BrandingAreaMargin />
        <InputForm />
        <div className="absolute inset-[413.5px_24px_185.01px_24px]" data-name="Spacer to push footer down" />
        <Margin />
        <LegalFooter />
        <SocialLoginAlternativesOptionalButGoodForUx />
      </div>
    </div>
  );
}

function IOsHomeIndicator() {
  return (
    <div className="h-[32px] relative shrink-0 w-[356px]" data-name="iOS Home Indicator">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-end justify-center pb-[8px] relative size-full">
        <div className="bg-[rgba(15,23,42,0.2)] h-[4px] rounded-[9999px] shrink-0 w-[128px]" data-name="Overlay" />
      </div>
    </div>
  );
}

function MobileContainer() {
  return (
    <div className="bg-white h-[795.6px] max-h-[795.5999755859375px] max-w-[384px] relative rounded-[24px] shrink-0 w-full" data-name="Mobile Container">
      <div className="content-stretch flex flex-col items-start max-h-[inherit] max-w-[inherit] overflow-clip p-px relative rounded-[inherit] size-full">
        <StatusBarPlaceholderIOsStyle />
        <RoleToggle />
        <MainContentArea />
        <IOsHomeIndicator />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f1f5f9] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

export default function LoginScreen() {
  return (
    <div className="bg-[#f6f7f8] content-stretch flex flex-col items-center justify-center px-[16px] py-[44.2px] relative size-full" data-name="Login Screen">
      <MobileContainer />
    </div>
  );
}