"use client";
import { useRouter, usePathname } from "next/navigation";
import { useParams } from "next/navigation";

const LanguageToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentLocale = params.locale as string;

  const switchLanguage = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <button
      onClick={switchLanguage}
      className='language-toggle btn btn-outline-primary'
      style={{
        minWidth: "70px",
        fontSize: "14px",
        padding: "5px 15px",
        marginLeft: "10px",
      }}>
      {currentLocale === "en" ? "عربي" : "English"}
    </button>
  );
};

export default LanguageToggle;
