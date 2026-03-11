import imgAbstractBackgroundPatternSubtleOverlay from "figma:asset/10655a55ec79232904a9e80359c3adde980f24fb.png";

function VersionNumber() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Version Number">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.6)] tracking-[1.2px] uppercase w-[93.56px]">
        <p className="leading-[16px] whitespace-pre-wrap">Version 1.0.0</p>
      </div>
    </div>
  );
}

function BottomSection() {
  return (
    <div className="absolute bottom-[48px] content-stretch flex flex-col gap-[24px] items-center left-0 right-0" data-name="Bottom Section">
      <div className="relative rounded-[9999px] shrink-0 size-[32px]" data-name="Loading Spinner">
        <div aria-hidden="true" className="absolute border-4 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      </div>
      <VersionNumber />
    </div>
  );
}

function Shadow() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06),0px_4px_3px_0px_rgba(0,0,0,0.07)] shrink-0" data-name="Shadow">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[48px] text-[48px] text-white">
        <p className="leading-[48px] whitespace-pre-wrap">bolt</p>
      </div>
    </div>
  );
}

function Shadow1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06),0px_4px_3px_0px_rgba(0,0,0,0.07)]" data-name="Shadow">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[48px] text-[48px] text-white">
        <p className="leading-[48px] whitespace-pre-wrap">build</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pl-[8px] relative self-stretch shrink-0" data-name="Margin">
      <Shadow1 />
    </div>
  );
}

function Shadow2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06),0px_4px_3px_0px_rgba(0,0,0,0.07)]" data-name="Shadow">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[48px] text-[48px] text-white">
        <p className="leading-[48px] whitespace-pre-wrap">water_drop</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pl-[8px] relative self-stretch shrink-0" data-name="Margin">
      <Shadow2 />
    </div>
  );
}

function IconComposition() {
  return (
    <div className="relative shrink-0" data-name="Icon Composition">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative">
        <Shadow />
        <Margin />
        <Margin1 />
      </div>
    </div>
  );
}

function LogoContainer() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.1)] relative rounded-[16px] shrink-0" data-name="Logo Container">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[33px] relative rounded-[inherit]">
        <IconComposition />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function LogoContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0" data-name="Logo Container:margin">
      <LogoContainer />
    </div>
  );
}

function Heading1AppName() {
  return (
    <div className="content-stretch flex flex-col items-start relative shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Heading 1 - App Name">
      <div className="flex flex-col font-['Manrope:Extra_Bold',sans-serif] h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-white tracking-[-0.9px] w-[146.84px]">
        <p className="leading-[40px] whitespace-pre-wrap">FixItNow</p>
      </div>
    </div>
  );
}

function Heading1AppNameMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[12px] relative shrink-0" data-name="Heading 1 - App Name:margin">
      <Heading1AppName />
    </div>
  );
}

function Tagline() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-90 relative shrink-0" data-name="Tagline">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium h-[28px] justify-center leading-[0] relative shrink-0 text-[#eff6ff] text-[18px] tracking-[0.45px] w-[292.66px]">
        <p className="leading-[28px] whitespace-pre-wrap">Trusted Home Services, Instantly</p>
      </div>
    </div>
  );
}

function MainContentContainer() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Main Content Container">
      <LogoContainerMargin />
      <Heading1AppNameMargin />
      <Tagline />
    </div>
  );
}

function SplashScreenContent() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-[1_0_0] flex-col from-[#136dec] items-center justify-center min-h-px min-w-px relative to-[#0d4eb0] via-1/2 via-[#136dec] w-full" data-name="Splash Screen Content">
      <div className="absolute bg-size-[67px_100px] bg-top-left inset-0 mix-blend-overlay opacity-10" data-name="Abstract Background Pattern (Subtle Overlay)" style={{ backgroundImage: `url('${imgAbstractBackgroundPatternSubtleOverlay}')` }} />
      <div className="-translate-x-1/2 absolute bg-white blur-[32px] bottom-[52.19%] left-1/2 opacity-10 rounded-[9999px] top-[18.85%] w-[256px]" data-name="Decorative Glow" />
      <BottomSection />
      <MainContentContainer />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] relative shrink-0 text-[12px] text-white w-[23.25px]">
        <p className="leading-[16px] whitespace-pre-wrap">9:41</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[16px] text-white">
        <p className="leading-[16px] whitespace-pre-wrap">signal_cellular_alt</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[16px] text-white">
        <p className="leading-[16px] whitespace-pre-wrap">wifi</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative" data-name="Container">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[16px] text-white">
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
      <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function StatusBarPlaceholderIOsStyle() {
  return (
    <div className="absolute content-stretch flex h-[48px] items-center justify-between left-0 opacity-90 px-[24px] right-0 top-0" data-name="Status Bar Placeholder (iOS Style)">
      <Container />
      <Container1 />
    </div>
  );
}

export default function SplashScreen() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Splash Screen" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), linear-gradient(90deg, rgb(246, 247, 248) 0%, rgb(246, 247, 248) 100%)" }}>
      <SplashScreenContent />
      <StatusBarPlaceholderIOsStyle />
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0.4)] bottom-[8px] h-[4px] left-1/2 rounded-[9999px] w-[128px]" data-name="Home Indicator (iOS)" />
    </div>
  );
}