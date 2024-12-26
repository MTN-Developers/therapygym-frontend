// Terms and Privacy Section
const TermsAndPrivacy = ({ t }) => {  


return <p className="w-full text-center text-sm text-gray-500">
    {t("AgreeMessage")} mtn{" "}
    <span className="text-blue-500 underline">{t("TermsConditions")}</span>{" "}
    {t("And")}{" "}
    <span className="text-blue-500 underline">{t("PrivacyPolicy")}</span>
  </p>
}


export default TermsAndPrivacy;