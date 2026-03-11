import imgAb6AXuBlvGAtLw6Tfky3VicWAvL0YseyOnigqiPptXddXnxdpjMRgWcK4X6BRrbiNmeyTKdg2TeKtgBk5O5W8Mo55QpSbuB74HMMj14OtvViEcf0GH67EcQrLaY2Ej5WiZ4FPYzOmf7REnPvAnD5ZlcUfhCm3Aoq4LaXsTlMbjUuk0HuDjIoMqSwkyh2CtOT8ZlGHdLpZkC6UEqXs1Tf6Imj4BIAuLkTHy8UOzPq8IeH8IJ5Hve2QUQr5RGyZVtKi7BI from "figma:asset/7722d1aba899af3b04b3ab169634d97f17c0eaa2.png";

function ProgressBar() {
  return (
    <div className="absolute bg-[#f1f5f9] h-[4px] left-0 right-0 top-[113px]" data-name="Progress Bar">
      <div className="absolute bg-[#136dec] inset-[0_40%_0_0] rounded-br-[9999px] rounded-tr-[9999px]" data-name="Background" />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[24px] w-full">
        <p className="leading-[32px] whitespace-pre-wrap">Upload Documents</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#64748b] text-[14px] w-full whitespace-pre-wrap">
        <p className="leading-[22.75px] mb-0">To activate your technician account, we need to</p>
        <p className="leading-[22.75px] mb-0">verify your identity and qualifications. All fields</p>
        <p>
          <span className="leading-[22.75px]">{`marked with `}</span>
          <span className="font-['Manrope:Regular',sans-serif] font-normal leading-[22.75px] text-[#ef4444]">*</span>
          <span className="leading-[22.75px]">{` are mandatory.`}</span>
        </p>
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header Section">
      <div className="content-stretch flex flex-col gap-[6.75px] items-start p-[24px] relative w-full">
        <Heading1 />
        <Container />
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[12px] pt-[2px] relative">
        <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#136dec] text-[20px] w-[20px]">
          <p className="leading-[28px] whitespace-pre-wrap">verified_user</p>
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] relative shrink-0 text-[#1e293b] text-[14px] w-[99.11px]">
        <p className="leading-[20px] whitespace-pre-wrap">Secure Upload</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[32px] justify-center leading-[16px] relative shrink-0 text-[#64748b] text-[12px] w-[266.28px] whitespace-pre-wrap">
        <p className="mb-0">Your documents are encrypted and only used for</p>
        <p>verification purposes.</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative">
        <Heading2 />
        <Container2 />
      </div>
    </div>
  );
}

function ValidationAlert() {
  return (
    <div className="bg-[rgba(19,109,236,0.05)] content-stretch flex items-start p-[17px] relative rounded-[12px] shrink-0 w-[342px]" data-name="Validation Alert">
      <div aria-hidden="true" className="absolute border border-[rgba(19,109,236,0.2)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Margin />
      <Container1 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#ef4444] text-[16px] w-[7.44px]">
        <p className="leading-[24px] whitespace-pre-wrap">*</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#1e293b] text-[16px] w-[115.31px]">
        <p className="leading-[24px] whitespace-pre-wrap">Government ID</p>
      </div>
      <Margin1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Heading3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#64748b] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">{`Passport, Driver's License, or National ID Card.`}</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#136dec] text-[24px] text-center w-[24px]">
        <p className="leading-[32px] whitespace-pre-wrap">cloud_upload</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(19,109,236,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Overlay">
      <Container6 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col h-[60px] items-start pb-[12px] relative shrink-0 w-[48px]" data-name="Margin">
      <Overlay />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[14px] text-center w-[160.25px]">
        <p className="leading-[20px] whitespace-pre-wrap">Tap to upload Front Side</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0" data-name="Margin">
      <Container7 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[12px] text-center w-[180.97px]">
        <p className="leading-[16px] whitespace-pre-wrap">SVG, PNG, JPG or PDF (max. 5MB)</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[24px] pt-[20px] px-[16px] relative">
        <Margin2 />
        <Margin3 />
        <Container8 />
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex flex-col h-[160px] items-center justify-center p-[2px] relative rounded-[12px] shrink-0 w-full" data-name="Label">
      <div aria-hidden="true" className="absolute border-2 border-[#cbd5e1] border-dashed inset-0 pointer-events-none rounded-[12px]" />
      <Container5 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1e293b] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">drivers_license_back.jpg</p>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[10px] text-[#16a34a] text-[10px]">
        <p className="leading-[10px] whitespace-pre-wrap">check_circle</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Margin5 />
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#16a34a] text-[12px] w-[89.36px]">
        <p className="leading-[16px] whitespace-pre-wrap">Ready to submit</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[1.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[61px] pl-[12px] right-[53px] top-[18px]" data-name="Margin">
      <Container9 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[24px] text-[#94a3b8] text-[24px] text-center">
        <p className="leading-[24px] whitespace-pre-wrap">delete_outline</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[289px] p-[8px] top-1/2" data-name="Button">
      <Container12 />
    </div>
  );
}

function Ab6AXuBlvGAtLw6Tfky3VicWAvL0YseyOnigqiPptXddXnxdpjMRgWcK4X6BRrbiNmeyTKdg2TeKtgBk5O5W8Mo55QpSbuB74HMMj14OtvViEcf0GH67EcQrLaY2Ej5WiZ4FPYzOmf7REnPvAnD5ZlcUfhCm3Aoq4LaXsTlMbjUuk0HuDjIoMqSwkyh2CtOT8ZlGHdLpZkC6UEqXs1Tf6Imj4BIAuLkTHy8UOzPq8IeH8IJ5Hve2QUQr5RGyZVtKi7BI() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px opacity-80 relative w-full" data-name="AB6AXuBlvGAtLW6tfky3VicWAvL0YseyONIGQI_PPT-xddXnxdpjMRgWcK-4X6BRrbiNmeyT_KDG2TeKTGBk5o5w8mo5-5QpSbuB74hMMj14otvViECF0gH67ec-QrLa-y2EJ5-wiZ4fPYzOmf7rENPvAnD5ZlcUfhCm3AOQ4LaXsTLMbjUUK0-huDJ-IoMqSWKYH2CT_oT8zlGHdLpZkC6uEqXS1tf6imj4bIAuLkT-Hy8uOZPq8IeH8iJ5HVE2qUQr5r_GyZVtKi--7bI">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAb6AXuBlvGAtLw6Tfky3VicWAvL0YseyOnigqiPptXddXnxdpjMRgWcK4X6BRrbiNmeyTKdg2TeKtgBk5O5W8Mo55QpSbuB74HMMj14OtvViEcf0GH67EcQrLaY2Ej5WiZ4FPYzOmf7REnPvAnD5ZlcUfhCm3Aoq4LaXsTlMbjUuk0HuDjIoMqSwkyh2CtOT8ZlGHdLpZkC6UEqXs1Tf6Imj4BIAuLkTHy8UOzPq8IeH8IJ5Hve2QUQr5RGyZVtKi7BI} />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#f1f5f9] content-stretch flex flex-col items-start justify-center left-[13px] overflow-clip rounded-[8px] size-[48px] top-1/2" data-name="Background">
      <Ab6AXuBlvGAtLw6Tfky3VicWAvL0YseyOnigqiPptXddXnxdpjMRgWcK4X6BRrbiNmeyTKdg2TeKtgBk5O5W8Mo55QpSbuB74HMMj14OtvViEcf0GH67EcQrLaY2Ej5WiZ4FPYzOmf7REnPvAnD5ZlcUfhCm3Aoq4LaXsTlMbjUuk0HuDjIoMqSwkyh2CtOT8ZlGHdLpZkC6UEqXs1Tf6Imj4BIAuLkTHy8UOzPq8IeH8IJ5Hve2QUQr5RGyZVtKi7BI />
    </div>
  );
}

function UploadCardFilledStateExampleBackSide() {
  return (
    <div className="bg-white h-[74px] relative rounded-[12px] shrink-0 w-full" data-name="Upload Card: Filled State Example (Back Side)">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Margin4 />
      <Button />
      <Background />
    </div>
  );
}

function Section1Identity() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section 1: Identity">
      <Container3 />
      <Container4 />
      <Label />
      <UploadCardFilledStateExampleBackSide />
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#ef4444] text-[16px] w-[7.44px]">
        <p className="leading-[24px] whitespace-pre-wrap">*</p>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#1e293b] text-[16px] w-[131.45px]">
        <p className="leading-[24px] whitespace-pre-wrap">Trade Certificate</p>
      </div>
      <Margin6 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Heading4 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[16px] relative shrink-0 text-[#64748b] text-[12px] w-full whitespace-pre-wrap">
        <p className="mb-0">Proof of qualification for your specific trade (e.g. Electrician</p>
        <p>License).</p>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[24px] text-[#ef4444] text-[24px]">
        <p className="leading-[24px] whitespace-pre-wrap">error_outline</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#dc2626] text-[14px] w-[89.25px]">
        <p className="leading-[20px] whitespace-pre-wrap">Upload Failed</p>
      </div>
    </div>
  );
}

function Margin8() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(239,68,68,0.8)] w-[132.38px]">
        <p className="leading-[16px] whitespace-pre-wrap">File too large (Max 5MB)</p>
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#136dec] text-[12px] w-[52.7px]">
        <p className="[text-decoration-skip-ink:none] decoration-solid leading-[16px] underline whitespace-pre-wrap">Try Again</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-1/2 pb-[24px] pt-[20px] top-1/2" data-name="Container">
      <Margin7 />
      <Container16 />
      <Margin8 />
      <Margin9 />
    </div>
  );
}

function Label1() {
  return (
    <div className="bg-[#fef2f2] h-[128px] relative rounded-[12px] shrink-0 w-full z-[2]" data-name="Label">
      <div aria-hidden="true" className="absolute border-2 border-[#fca5a5] border-dashed inset-0 pointer-events-none rounded-[12px]" />
      <Container15 />
    </div>
  );
}

function Margin10() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[14px] text-[#ef4444] text-[14px]">
        <p className="leading-[14px] whitespace-pre-wrap">warning</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[338px] z-[1]" data-name="Container">
      <Margin10 />
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#ef4444] text-[12px] w-[176.52px]">
        <p className="leading-[16px] whitespace-pre-wrap">Please upload a valid certificate.</p>
      </div>
    </div>
  );
}

function ErrorStateExample() {
  return (
    <div className="content-stretch flex flex-col gap-[7.5px] isolate items-end relative shrink-0 w-full" data-name="Error State Example">
      <Label1 />
      <Container17 />
    </div>
  );
}

function Section2Certification() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section 2: Certification">
      <Container13 />
      <Container14 />
      <ErrorStateExample />
    </div>
  );
}

function Border() {
  return (
    <div className="content-stretch flex flex-col items-start px-[7px] py-[3px] relative rounded-[4px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[10px] tracking-[0.5px] uppercase w-[53.47px]">
        <p className="leading-[24px] whitespace-pre-wrap">Optional</p>
      </div>
    </div>
  );
}

function Margin11() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[8px] relative shrink-0" data-name="Margin">
      <Border />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#1e293b] text-[16px] w-[141.45px]">
        <p className="leading-[24px] whitespace-pre-wrap">Liability Insurance</p>
      </div>
      <Margin11 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Heading5 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[24px] text-[#64748b] text-[24px] text-center">
        <p className="leading-[24px] whitespace-pre-wrap">add_photo_alternate</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]" data-name="Background">
      <Container20 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] relative shrink-0 text-[#475569] text-[14px] text-center w-[165.05px]">
        <p className="leading-[20px] whitespace-pre-wrap">Add Insurance Document</p>
      </div>
    </div>
  );
}

function Margin12() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[12px] relative shrink-0" data-name="Margin">
      <Container21 />
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Background1 />
        <Margin12 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[24px] text-[#cbd5e1] text-[24px] text-center">
          <p className="leading-[24px] whitespace-pre-wrap">chevron_right</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[17px] relative w-full">
          <Container19 />
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function Section3InsuranceOptional() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section 3: Insurance (Optional)">
      <Container18 />
      <Button1 />
    </div>
  );
}

function Form() {
  return (
    <div className="relative shrink-0 w-full" data-name="Form">
      <div className="content-stretch flex flex-col gap-[32px] items-start pt-[24px] px-[24px] relative w-full">
        <Section1Identity />
        <div className="bg-[#f1f5f9] h-px shrink-0 w-full" data-name="Horizontal Divider" />
        <Section2Certification />
        <Section3InsuranceOptional />
      </div>
    </div>
  );
}

function MainContentScrollArea() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 overflow-clip pb-[144px] right-0 top-[117px]" data-name="Main Content Scroll Area">
      <HeaderSection />
      <ValidationAlert />
      <Form />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[24px] text-[#475569] text-[24px] text-center">
        <p className="leading-[24px] whitespace-pre-wrap">arrow_back</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[-8px] p-[8px] rounded-[9999px] top-0" data-name="Button">
      <Container23 />
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="h-[40px] relative shrink-0 w-[32px]" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button2 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#136dec] text-[12px] tracking-[0.6px] uppercase w-[72.2px]">
        <p className="leading-[16px] whitespace-pre-wrap">Step 3 of 5</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[14px] w-[78.91px]">
        <p className="leading-[20px] whitespace-pre-wrap">Verification</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <Container25 />
        <Heading />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center relative">
        <div className="flex flex-col font-['Manrope:Semi_Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#136dec] text-[14px] text-center w-[30.5px]">
          <p className="leading-[20px] whitespace-pre-wrap">Help</p>
        </div>
      </div>
    </div>
  );
}

function TopNavigation() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-between left-0 pb-[13px] pt-[12px] px-[20px] right-0 top-[48px]" data-name="Top Navigation">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-b border-solid inset-0 pointer-events-none" />
      <ButtonMargin />
      <Container24 />
      <Button3 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] relative shrink-0 text-[#0f172a] text-[12px] w-[24.14px]">
        <p className="leading-[16px] whitespace-pre-wrap">9:41</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">signal_cellular_alt</p>
      </div>
    </div>
  );
}

function Margin13() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[8px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">wifi</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative" data-name="Container">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">battery_full</p>
      </div>
    </div>
  );
}

function ContainerCssTransform() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start justify-center pl-[5px] py-[3px] relative shrink-0" data-name="Container:css-transform">
      <div className="flex h-[14px] items-center justify-center relative shrink-0 w-[20px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <Container29 />
        </div>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container28 />
      <Margin13 />
      <ContainerCssTransform />
    </div>
  );
}

function StatusBarAreaMockup() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-between left-0 pl-[24px] pr-[21px] right-0 top-0" data-name="Status Bar Area (Mockup)">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[16px] text-center w-[148.94px]">
        <p className="leading-[24px] whitespace-pre-wrap">Submit Documents</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-50 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Material_Icons_Round:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] text-center w-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">lock</p>
      </div>
    </div>
  );
}

function Margin14() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[8px] relative shrink-0" data-name="Margin">
      <Container31 />
    </div>
  );
}

function ButtonDisabledStateByDefaultAsPerRequirementSinceErrorExists() {
  return (
    <div className="bg-[#e2e8f0] relative rounded-[12px] shrink-0 w-full" data-name="Button - Disabled State by default as per requirement (since error exists)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center py-[16px] relative w-full">
        <Container30 />
        <Margin14 />
      </div>
    </div>
  );
}

function ThisWouldBeTheActiveState() {
  return (
    <div className="relative shrink-0 w-full" data-name="This would be the Active state">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[16px] relative w-full">
          <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[30px] justify-center leading-[0] relative shrink-0 text-[#94a3b8] text-[10px] text-center w-[298.72px] whitespace-pre-wrap">
            <p className="mb-0">
              <span className="leading-[15px]">{`By submitting, you agree to our `}</span>
              <span className="font-['Manrope:Regular',sans-serif] font-normal leading-[15px] text-[#136dec]">Terms of Service</span>
              <span className="leading-[15px]">{` and confirm that`}</span>
            </p>
            <p className="leading-[15px]">all uploaded documents are genuine.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StickyFooter() {
  return (
    <div className="absolute bg-white bottom-0 content-stretch flex flex-col gap-[16px] items-start left-0 pb-[24px] pt-[25px] px-[24px] right-0" data-name="Sticky Footer">
      <div aria-hidden="true" className="absolute border-[#f1f5f9] border-solid border-t inset-0 pointer-events-none" />
      <ButtonDisabledStateByDefaultAsPerRequirementSinceErrorExists />
      <ThisWouldBeTheActiveState />
    </div>
  );
}

export default function DocumentVerification() {
  return (
    <div className="relative shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Document Verification" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), linear-gradient(90deg, rgb(246, 247, 248) 0%, rgb(246, 247, 248) 100%)" }}>
      <ProgressBar />
      <MainContentScrollArea />
      <TopNavigation />
      <StatusBarAreaMockup />
      <StickyFooter />
    </div>
  );
}