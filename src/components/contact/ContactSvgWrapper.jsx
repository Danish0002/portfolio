import ContactSvg from "./ContactSvg";

const ContactSvgWrapper = () => {
  return (
    <div className="w-full xl:w-1/2 flex items-center justify-center">
      <div className="w-full h-full bg-slate-800 rounded-[50%_0px] p-10 xl:m-12 flex items-center justify-center">
        <ContactSvg />
      </div>
    </div>
  );
};

export default ContactSvgWrapper;
