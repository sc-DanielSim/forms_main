export const SOCIAL_FACEBOOK = 'facebook';
export const SOCIAL_TWITTER = 'twitter';
export const SOCIAL_LINKEDIN = 'linkedin';
export const SOCIAL_WHATSAPP = 'whatsapp';

export const GG_SCHEMA_ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Corporation',
  name: 'Zuellig Pharma',
  alternateName: 'Zuellig Pharma Pte Ltd',
  url: 'https://www.zuelligpharma.com/',
  logo: '',
  sameAs: 'https://www.linkedin.com/company/zuellig-pharma',
};

export const GG_SCHEMA_LINKS_SEARCHBOX = {
  '@context': 'https://schema.org/',
  '@type': 'WebSite',
  name: 'Zuellig Pharma',
  url: 'https://www.zuelligpharma.com/',
  potentialAction: {
    '@type': 'SearchAction',
    target:
      'https://www.zuelligpharma.com/search?q={search_term_string}https://www.zuelligpharma.com/search?q=zuellig%20pharma',
    'query-input': 'required name=search_term_string',
  },
};

export const GG_SCHEMA_FAQ__HOME_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Zuellig Pharma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma is a leading pharmaceutical and healthcare solutions company that provides comprehensive healthcare solutions to the healthcare industry. Zuellig Pharma provides world-class pharmaceutical distribution, digital and commercial services to support the evolving healthcare needs in the region.',
      },
    },
    {
      '@type': 'Question',
      name: 'What services does Zuellig Pharma offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma offers a wide range of services, including pharmaceutical distribution, healthcare logistics, supply chain solutions, clinical reach solutions, healthcare and patient solutions, medical or healthcare commercial and regulatory services, and healthcare technology services. We are committed to providing comprehensive solutions to our clients in the healthcare industry.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Zuellig Pharma located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our company is headquartered in Singapore, and we have a strong regional presence with offices in multiple locations across the following locations - Australia, Brunei, Cambodia, China, Hong Kong & Macau, India, Indonesia, Japan, Korea, Malaysia, Myanmar, Philippines, Singapore, Taiwan, Thailand and  Vietnam.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact Zuellig Pharma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can easily reach out to us through our Contact Us page on our website. We are committed to providing excellent customer support and assistance to address your inquiries and concerns on our healthcare and pharmaceutical solutions and services.',
      },
    },
    {
      '@type': 'Question',
      name: "What are Zuellig Pharma's core values?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At Zuellig Pharma, our core values revolve around a commitment to quality, safety, and sustainability in the healthcare industry. We are dedicated to upholding the highest standards of integrity and ethical conduct.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the latest innovations in the healthcare industry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma actively follows and contributes to the latest healthcare innovations and trends. We keep you updated on industry advancements, healthcare insights, and research publications through our website and reports.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Zuellig Pharma offer healthcare insights or reports?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide comprehensive healthcare insights and reports on the latest industry trends and developments. Our research publications offer valuable information for industry professionals and stakeholders.',
      },
    },
    {
      '@type': 'Question',
      name: "What is Zuellig Pharma's role in healthcare sustainability?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We take our commitment to healthcare sustainability seriously. Zuellig Pharma engages in sustainable practices, environmental responsibility, and corporate social responsibility to contribute to a healthier and greener world.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I partner with Zuellig Pharma for business collaborations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "If you're interested in business collaborations or partnership opportunities with us, please visit our healthcare solutions pages to explore the various ways we can work together to support the healthcare industry.",
      },
    },
    {
      '@type': 'Question',
      name: "What is Zuellig Pharma's commitment to quality and safety in healthcare?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma is dedicated to maintaining the highest standards of quality assurance and safety in the healthcare industry. We adhere to strict safety standards and healthcare compliance regulations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I find career opportunities at Zuellig Pharma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Zuellig Pharma offers a range of career opportunities in various healthcare services fields. Check our Careers page for information on job openings and employment opportunities.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma support the local communities it serves?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We actively engage in community outreach and corporate social responsibility initiatives to support the local communities where we operate. Our commitment to the well-being of the communities and making healthcare accessible to the people where we serve is an integral part of our mission.',
      },
    },
  ],
};
export const GG_SCHEMA_FAQ__SOLUTIONS_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What pharmaceutical solutions does Zuellig Pharma, a leading pharma solutions company, offer in Asia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma, a trusted pharma solutions company, provides a comprehensive range of pharmaceutical solutions in Asia. Our services include healthcare commercialisation, partnerships and regulatory solutions, healthcare distribution and pharmaceutical logistics solutions, supply chain optimisation, and healthcare technology solutions tailored to each regional market.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can Zuellig Pharma support my healthcare supply chain needs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma specialise in healthcare supply chain solutions, offering services that encompass timely delivery, inventory management, warehousing, cold chain solutions, and distribution optimisation to enhance the efficiency of your healthcare operations.',
      },
    },
    {
      '@type': 'Question',
      name: "What role does technology play in Zuellig Pharma's pharmaceutical solutions for pharmaceutical markets?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Technology is integral to our pharmaceutical solutions. As a leading pharma solutions company, we leverage cutting-edge healthcare technology to streamline processes, improve visibility, and drive innovation in the pharmaceutical and healthcare sectors.',
      },
    },
    {
      '@type': 'Question',
      name: "Can I customise Zuellig Pharma's pharma solutions to fit my specific healthcare business needs?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Zuellig Pharma provides customisable pharmaceutical solutions tailored to your unique healthcare business needs. We aim to optimise your market entry and operations effectively in the region.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can Zuellig Pharma help improve healthcare delivery and patient care with its pharmaceutical solutions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our pharmaceutical solutions focus on enhancing healthcare delivery and patient care. Our patient solutions improve healthcare outcomes, affordability, education & disease management for a better patientcare experience. We prioritise timely and reliable distribution and other patient programs to ensure that the patients receive utmost care they need when they need it.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the latest trends in pharmaceutical solutions offered by Zuellig Pharma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stay informed about the latest trends in pharmaceutical solutions and industry advancements in Asian, Australia and European markets through our yearly reports and insights. We continuously update our solutions to align with the changing healthcare landscape in the region.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer specialised pharmaceutical solutions for pharmaceutical manufacturers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer specialised solutions for pharmaceutical manufacturers, including warehousing, distribution, clinical trials and regulatory support to ensure product integrity and compliance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma ensure quality and safety in its pharmaceutical solutions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quality and safety are our top priorities. We adhere to strict healthcare quality control standards and regulatory compliance to ensure the highest level of quality and safety in our pharmaceutical solutions.',
      },
    },
    {
      '@type': 'Question',
      name: "What is the reach and coverage of Zuellig Pharma's pharmaceutical solutions company?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We have a strong regional presence, serving healthcare businesses across South East Asia. Our extensive network ensures that our pharmaceutical solutions are accessible to a wide range of clients in the region. For more information visit our offerings in each market listed on our homepage, https://www.zuelligpharma.com/',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I partner with Zuellig Pharma to optimise my healthcare operations with pharmaceutical solutions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Explore partnership opportunities with us to benefit from our expertise and innovative pharmaceutical solutions. Collaborate with us to enhance your healthcare operations and overall performance. Contact Zuellig Pharma for more information',
      },
    },
  ],
};
export const GG_SCHEMA_FAQ__DISTRIBUTION_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does Zuellig Pharma offer as one of the leading pharmaceutical distribution solutions providers in the industry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As a prominent pharma distribution company, Zuellig Pharma offers a comprehensive suite of pharmaceutical distribution solutions and services to meet the diverse needs of the healthcare industry. Zuellig Pharma offers warehousing, cold chain solutions, distribution risk management solutions, regional distribution centres, redressing and late stage customisations services, and other specialty solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma ensure efficient pharmaceutical distribution and logistics, and what sets it apart from other pharma distributors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Zuellig Pharma's commitment to cutting-edge pharma logistics, quality control, and a vast distribution network sets us apart as one of the industry's top pharmaceutical wholesale distributors.",
      },
    },
    {
      '@type': 'Question',
      name: "Can I find information about Zuellig Pharma's product categories, including generic medicine distribution, on the website?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. You can explore our website to discover the wide range of product categories, including generic and branded medicine pharmaceutical distribution, that Zuellig Pharma offers as part of its pharmaceutical distribution solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma contribute to maintaining a robust pharmaceutical supply chain and ensuring product integrity during distribution?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma plays a pivotal role in the pharmaceutical supply chain by upholding strict quality control standards and ensuring product integrity throughout the distribution process.',
      },
    },
    {
      '@type': 'Question',
      name: 'What regions does Zuellig Pharma serve, and what is its distribution reach as a pharma distribution company?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "We have an extensive distribution reach, serving various regions. Zuellig Pharma is among the industry's leading pharma distributors, ensuring a broad geographical coverage with solutions including cold chain distribution.",
      },
    },
    {
      '@type': 'Question',
      name: 'How can I collaborate with Zuellig Pharma for the distribution of pharmaceutical products and generic medicine distribution?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Explore partnership opportunities with us to leverage our expertise in pharmaceutical distribution and generic medicine distribution. We offer tailored solutions to optimise your pharmaceutical supply chain. Contact Zuellig Pharma for more information.',
      },
    },
    {
      '@type': 'Question',
      name: "Where can I find more information about Zuellig Pharma's product categories, pharma logistics, and pharmaceutical distribution services?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For in-depth information on Zuellig Pharma\'s product categories, pharma logistics, and pharmaceutical distribution services, please visit our website\'s "Distribution Solutions" page, https://www.zuelligpharma.com/solutions/distribution',
      },
    },
  ],
};
export const GG_SCHEMA_FAQ__ZP_THERAPEUTICS_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What makes Zuellig Pharma a trusted healthcare partner in the industry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma is recognised as a reliable healthcare partner, offering a wide range of integrated healthcare services to support businesses in the healthcare commercialisation process.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma function as a healthcare commercialisation partner for pharmaceutical and healthcare companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As a healthcare commercialisation partner, Zuellig Pharma provides a suite of integrated healthcare services to facilitate the introduction and commercialisation of healthcare products, ensuring a smoother market entry and drive growth for our commercial partners.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the key services provided by Zuellig Pharma as an integrated healthcare partner?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma offers a variety of integrated healthcare services, including market access, distribution, and regulatory support, pharmacovigilance, medical affairs, sales and marketing and alliance management to assist healthcare companies in successfully bringing their products to market.',
      },
    },
    {
      '@type': 'Question',
      name: "Can you find information about Zuellig Pharma's product categories and healthcare solutions on the website, particularly for ZP Therapeutics?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can explore our website to discover the product categories and healthcare solutions, including ZP Therapeutics solutions, that Zuellig Pharma offers as part of its integrated healthcare services.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can Zuellig Pharma enhance the healthcare commercialisation process and support the success of healthcare companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Zuellig Pharma's expertise in integrated healthcare services, from market access to distribution, helps healthcare companies navigate challenges and improve their chances of success in the commercialisation process.",
      },
    },
    {
      '@type': 'Question',
      name: "Where can I find more details about Zuellig Pharma's role as a healthcare partner and the services it provides under ZP Therapeutics?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For in-depth information on Zuellig Pharma\'s role as a healthcare partner and the services offered under ZP Therapeutics, please visit our website\'s "ZP Therapeutics Solutions" page, https://www.zuelligpharma.com/solutions/zp-therapeutics.',
      },
    },
  ],
};
export const GG_SCHEMA_FAQ__CLINICAL_REACH_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What role does Zuellig Pharma play in supporting clinical research and clinical trials?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma is a key player in facilitating clinical research and clinical trials by providing a robust clinical trials supply chain and logistics services.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma contribute to ensuring clinical research compliance in the healthcare industry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma places a strong emphasis on clinical research compliance, helping healthcare organisations adhere to regulatory standards throughout the clinical trials process.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you explain the services offered under the umbrella of “Clinical Reach“ at Zuellig Pharma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our Clinical Reach services encompass a range of solutions for clinical trials, including logistics, supply chain management, project management, packaging services, returns management, clinical sourcing, and compliance support, to help healthcare companies advance their medical trials.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the significance of a well-established clinical trials supply chain in the success of medical trials?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A well-structured clinical trials supply chain, such as the one offered by Zuellig Pharma, is vital to the success of medical trials. It ensures timely and efficient distribution of trial-related materials and overall management of the trials maintaining quality and compliance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can Zuellig Pharma enhance the clinical trials logistics process for healthcare organisations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Zuellig Pharma's clinical trials logistics services are designed to streamline the sourcing, transportation, storage, and distribution of clinical trial materials, contributing to the efficiency of the entire process.",
      },
    },
    {
      '@type': 'Question',
      name: "Where can I find more details about Zuellig Pharma's “Clinical Reach Solutions“ and the role it plays in clinical research and clinical trials?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For comprehensive information about Zuellig Pharma\'s Clinical Reach business and our involvement in clinical research and clinical trials, please visit our website\'s "Clinical Reach Solutions" page, https://www.zuelligpharma.com/solutions/clinical-reach',
      },
    },
  ],
};
export const GG_SCHEMA_FAQ__TECHNOLOGY_SOLUTIONS_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the key offerings of Zuellig Pharma in the realm of healthcare technology solutions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma provides a wide array of healthcare technology solutions, including healthcare data solutions, salesforce management, market intelligence, demand forecasting solutions, blockchain powered traceability solutions, digital health and patient care solutions, tender management solutions, pharmaceutical marketplace and analytics services.',
      },
    },
    {
      '@type': 'Question',
      name: "How do Zuellig Pharma's healthcare data solutions benefit healthcare organisations?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our healthcare data solutions offer valuable insights and support data-driven decision-making in the healthcare industry and help our pharmaceutical partners engage more with customers using our connected healthcare ecosystem.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you explain the role of healthcare data in modern healthcare, and how does Zuellig Pharma harness it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Healthcare data plays a crucial role in modern healthcare, and Zuellig Pharma utilises advanced data analytics to help healthcare organisations make informed decisions and improve patient outcomes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the significance of big data in healthcare, and how does Zuellig Pharma leverage it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Big data in healthcare is pivotal for identifying trends and improving healthcare practices. Zuellig Pharma harnesses big data analytics to drive innovation and efficiency in the healthcare sector.',
      },
    },
    {
      '@type': 'Question',
      name: "How can healthcare organisations benefit from Zuellig Pharma's health analytics services?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our health analytics services empower healthcare organisations to gain insights into patient care, optimise processes, and enhance overall efficiency.',
      },
    },
    {
      '@type': 'Question',
      name: 'What digital health solutions does Zuellig Pharma offer to meet the evolving needs of the healthcare industry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma offers a range of digital health solutions designed to improve patient care, streamline operations, and enhance the overall digital experience in healthcare.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I ensure the traceability and authenticity of pharmaceutical products in my supply chain?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "To ensure the traceability and authenticity of pharmaceutical products in your supply chain, you can utilise Zuellig Pharma's state-of-the-art solution, known as eZTracker. eZTracker is designed to provide end-to-end visibility and control over your pharmaceutical supply chain, helping you track products' journey from manufacturer to end-user, while also ensuring their authenticity and compliance with regulatory requirements.",
      },
    },
    {
      '@type': 'Question',
      name: 'How can pharmaceutical partners and patients conveniently engage in ordering pharmaceutical products?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Zuellig Pharma offers a healthcare, e-commerce product known as eZRx. Zuellig Pharma's eZRx is an award-winning healthcare, e-commerce platform for streamlined ordering, payment, and tracking of healthcare products providing an omnichannel service to their pharmaceutical partners.",
      },
    },
    {
      '@type': 'Question',
      name: "Where can I find more information about Zuellig Pharma's technology solutions and their impact on the healthcare data and digital health landscape?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For comprehensive information about Zuellig Pharma\'s technology solutions and their impact on healthcare data and digital health, please visit our website\'s "Technology Solutions" page, https://www.zuelligpharma.com/solutions/technology-solutions',
      },
    },
  ],
};
export const GG_SCHEMA_FAQ__PATIENT_SOLUTIONS_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma promote patient engagement in healthcare through its patient care solutions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma is dedicated to enhancing patient engagement in healthcare. Our patient care solutions include patient engagement programs and strategies to empower patients in managing their health.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you explain the significance of patient engagement and how Zuellig Pharma supports it through disease management solutions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Patient engagement is crucial for better health outcomes. Zuellig Pharma's disease management solutions are designed to foster patient engagement, allowing patients to actively participate in their healthcare journey.",
      },
    },
    {
      '@type': 'Question',
      name: 'What patient engagement programs does Zuellig Pharma offer to healthcare organisations and patients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma offers a variety of patient engagement programs like affordability services, awareness programs, adherence, vaccination, and other curated programs designed to improve patient care.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can healthcare organisations benefit from patient engagement strategies provided by Zuellig Pharma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our patient engagement strategies are tailored to help healthcare organisations build strong patient relationships, enhance adherence to treatment plans, and ultimately improve patient outcomes maintaining quality, compliance and privacy.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the impact of patient engagement solutions in modern healthcare, and how does Zuellig Pharma contribute to it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Patient engagement solutions play a pivotal role in modern healthcare, leading to better patient care and satisfaction. Zuellig Pharma contributes to this by offering innovative patient engagement solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Patient engagement solutions play a pivotal role in modern healthcare, leading to better patient care and satisfaction. Zuellig Pharma contributes to this by offering innovative patient engagement solutions.',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For comprehensive information about Zuellig Pharma\'s role in promoting patient engagement and its patient engagement strategies and programs, please visit our website\'s "Patient Solutions" page, https://www.zuelligpharma.com/solutions/patient-solutions.',
      },
    },
  ],
};
export const GG_SCHEMA_FAQ__REGULATORY_SERVICES_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the key healthcare regulatory services provided by Zuellig Pharma to ensure ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma offers a range of healthcare regulatory services aimed at ensuring regulatory compliance in healthcare. These services encompass various aspects of healthcare regulations and compliance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma assist healthcare organisations in navigating complex healthcare regulations and compliance requirements?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We assist healthcare organisations by providing expertise and guidance on healthcare regulations, helping them comply with regulatory requirements and standards.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the significance of adhering to healthcare regulations, and how does Zuellig Pharma support this in the healthcare industry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Adhering to healthcare regulations is vital for patient safety and the integrity of healthcare practices. Zuellig Pharma supports this by offering services that aid in meeting healthcare regulations and compliance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you explain the role of regulatory agencies in healthcare, and how does Zuellig Pharma facilitate interactions with such agencies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Regulatory agencies play a critical role in healthcare oversight. Zuellig Pharma facilitates interactions with regulatory agencies to ensure healthcare organisations meet regulatory requirements and standards. Zuellig Pharma offers analytics and regulatory intelligence services, market entry consultation and strategies, pharmacovigilance management services, new market research and localised entry application services with authorisation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the healthcare regulations that healthcare organisations need to be aware of, and how can Zuellig Pharma help them stay compliant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Healthcare organisations must be aware of various healthcare regulations. Zuellig Pharma can help them stay compliant by offering expert guidance and tailored regulatory services.',
      },
    },
    {
      '@type': 'Question',
      name: "Where can I find more information about Zuellig Pharma's role in healthcare regulations, regulatory compliance, and its healthcare regulatory services?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For comprehensive information about Zuellig Pharma\'s role in healthcare regulations, regulatory compliance, and its healthcare regulatory services, please visit our website\'s "Regulatory Services" page, https://www.zuelligpharma.com/solutions/regulatory-services',
      },
    },
  ],
};
export const GG_SCHEMA_FAQ__SEGMENTS_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma cater to various healthcare industry solutions across different healthcare industry segments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma provides a diverse range of healthcare industry solutions tailored to meet the unique needs of different healthcare industry segments and verticals.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the specific healthcare sectors that Zuellig Pharma serves, and what are the key products offered in these segments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma serves various healthcare sectors, offering a wide array of products designed to address the specific requirements of each healthcare segment. Zuellig pharma has presence in pharmaceutical, medical devices and diagnostics, consumer healthcare, vaccines, animal health and specialty care industries.',
      },
    },
    {
      '@type': 'Question',
      name: "Can you provide insights into the healthcare verticals that benefit from Zuellig Pharma's expertise and product offerings?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Zuellig Pharma's expertise extends to numerous healthcare verticals, ensuring that each sector receives specialised attention and solutions to enhance their operations.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma support the unique demands of different healthcare industries, and what is the significance of healthcare industry segments in this context?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma recognises the importance of healthcare industry segments and tailors its products and services to cater to the distinctive needs and requirements of each sector.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are some of the key Zuellig Pharma products that are widely used across healthcare industry segments, and where can I find more information about them?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma offers a range of products that are widely utilised in various healthcare industry segments. You can find detailed information about these products on our website.',
      },
    },
    {
      '@type': 'Question',
      name: "Where can I find more information about Zuellig Pharma's involvement in healthcare industries, healthcare sectors, and its product offerings for different healthcare industry segments?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For comprehensive information about Zuellig Pharma\'s involvement in healthcare industries, healthcare sectors, and its product offerings for different healthcare industry segments, please visit our website\'s "Segments" page, https://www.zuelligpharma.com/segments',
      },
    },
  ],
};
export const GG_SCHEMA_FAQ__PHARMACEUTICALS_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma contribute to the Asia pharma sector as one of the leading pharmaceutical companies in Asia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma plays a significant role in the Asia pharma sector, providing a wide range of pharmaceutical commercialisation services and serving as one of the top pharmaceutical companies in Asia.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the key offerings of Zuellig Pharma for pharmaceuticals in Asia, and how do we support pharmaceutical companies in the region?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma offers comprehensive services for pharmaceuticals in Asia, supporting pharmaceutical companies with their commercialisation, distribution and technology needs and facilitating their growth in the region.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you provide insights into the pharmaceutical partner role played by Zuellig Pharma for pharmaceutical companies in Asia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma serves as a pharmaceutical partner for companies in Asia, offering expertise and services to help them navigate the complex landscape of the pharmaceutical industry in the region.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma rank among the top pharmaceutical companies in Asia, and what sets it apart in the pharmaceuticals sector?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma is recognised as one of the top pharmaceutical companies in Asia, standing out due to its extensive experience and commitment to pharmaceutical commercialisation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the significant opportunities and challenges in the pharmaceuticals sector in Asia, and how can Zuellig Pharma help address them?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The pharmaceuticals sector in Asia offers immense opportunities and challenges. Zuellig Pharma is well-equipped to address these challenges and seize the opportunities to facilitate the growth of pharmaceutical companies in the region.',
      },
    },
    {
      '@type': 'Question',
      name: "Where can I find more information about Zuellig Pharma's role in Asia pharmaceuticals and its services for pharmaceutical companies in Asia?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For comprehensive information about Zuellig Pharma\'s role in Asia pharmaceuticals and the services provided to pharmaceutical companies in Asia, please visit our website\'s "Pharmaceuticals" page, https://www.zuelligpharma.com/segments/pharmaceuticals',
      },
    },
  ],
};
export const GG_SCHEMA_FAQ__MEDICAL_DEVICES_DIAGNOSTICS_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What role does Zuellig Pharma play in the distribution of medical devices and medical instruments in the healthcare industry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma is a key player in the distribution of medical devices and medical instruments, serving as a bridge between manufacturers and healthcare providers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma support medical device companies and diagnostics companies in the Asia-Pacific region?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide comprehensive solutions and logistics support to medical device companies and diagnostics companies, helping them navigate the complex healthcare landscape in the Asia-Pacific region.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you explain the significance of medical diagnostics and medical devices companies in healthcare, and how does Zuellig Pharma contribute to their success?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Medical diagnostics and medical devices companies are crucial for early disease detection and patient care. Zuellig Pharma facilitates their success by ensuring the efficient distribution of their products.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are some of the key medical devices and diagnostics solutions provided by Zuellig Pharma, and how can healthcare organisations benefit from them?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer a range of medical devices and diagnostics solutions, designed to enhance patient care and improve healthcare operations. Healthcare organisations can benefit from our efficient distribution network and specialty solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma rank among medical device companies and diagnostics companies in the region, and what sets it apart in the field of medical diagnostics and medical instruments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma is recognised as a leader among medical device companies and diagnostics companies in the region, distinguished by its extensive experience and commitment to healthcare improvement.',
      },
    },
    {
      '@type': 'Question',
      name: "Where can I find more information about Zuellig Pharma's role in medical devices and diagnostics, and the services it provides to support medical diagnostics and medical imaging companies?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For comprehensive information about Zuellig Pharma\'s role in medical devices and diagnostics and the services provided to support medical diagnostics and medical devices companies, please visit our website\'s "Medical Devices and Diagnostics" page, https://www.zuelligpharma.com/segments/medical-devices-diagnostics',
      },
    },
  ],
};
export const GG_SCHEMA_FAQ__CONSUMER_HEALTHCARE_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the role of Zuellig Pharma in the realm of consumer health and consumer healthcare products?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma plays a vital role in consumer health, offering a wide range of consumer healthcare products and solutions to support health and well-being.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma support consumer healthcare companies and businesses in the Asia-Pacific region?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide comprehensive support to consumer healthcare companies and businesses, helping them meet the requirements, like regulatory, compliance, and market expansion and needs of consumers in the Asia-Pacific region.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you explain the significance of consumer health education and information in the healthcare industry, and how does Zuellig Pharma contribute to it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Consumer health education and information are essential for promoting well-being. Zuellig Pharma contributes by providing educational resources and information on consumer healthcare products.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are some of the key consumer health products and solutions offered by Zuellig Pharma, and how can consumers benefit from them?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer a variety of consumer health products and solutions designed to improve health and wellness. Consumers can benefit from our high-quality products and expert guidance. Zuellig pharma offers tailored solutions for unique market needs and compliance solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma rank among consumer healthcare companies, and what distinguishes it in the field of consumer health and wellness?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma is recognised as a leader among consumer healthcare companies, known for its commitment to enhancing health and well-being in the Asia-Pacific region.',
      },
    },
    {
      '@type': 'Question',
      name: "Where can I find more information about Zuellig Pharma's role in consumer health, consumer healthcare, and the services it provides to support consumer health education and information?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For comprehensive information about Zuellig Pharma\'s role in consumer health, consumer healthcare, and the services provided to support consumer health education and information, please visit our website\'s "Consumer Healthcare" page, https://www.zuelligpharma.com/segments/consumer-healthcare',
      },
    },
  ],
};
export const GG_SCHEMA_FAQ__VACCINES_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma contribute to the vaccine supply chain and vaccine distribution in the Asia/ASEAN region?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma plays a critical role in the vaccine supply chain and vaccine distribution in the Asia/ASEAN region, ensuring the timely and efficient delivery of vaccines to those in need.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the key services and solutions offered by Zuellig Pharma in the field of vaccine supply chain management and distribution?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide a wide array of services and solutions to optimise the vaccine supply chain and ensure seamless vaccine distribution.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you explain the significance of a well-established vaccine supply chain in ensuring the availability and accessibility of vaccines in Asia/ASEAN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A robust vaccine supply chain is crucial for ensuring vaccines are readily available and accessible. Zuellig Pharma's expertise in vaccine supply chain management, with its sophisticated distribution systems and cold chain facilities, contributes to this goal.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma facilitate vaccine distribution to reach even the most remote areas in Asia/ASEAN, ensuring widespread vaccination coverage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We have a vast distribution network that allows us to reach even remote areas in Asia/ASEAN, ensuring that vaccines are distributed effectively to maximise vaccination coverage.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the role of Zuellig Pharma in supporting healthcare organisations, governments, and vaccine manufacturers in the efficient distribution of vaccines in the region?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma collaborates with healthcare organisations, governments, and vaccine manufacturers to ensure efficient vaccine distribution, strengthening healthcare systems in the Asia/ASEAN region.',
      },
    },
    {
      '@type': 'Question',
      name: "Where can I find more information about Zuellig Pharma's involvement in the vaccine supply chain and vaccine distribution?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For comprehensive information about Zuellig Pharma\'s involvement in the vaccine supply chain and vaccine distribution in Asia/ASEAN, please visit our website\'s "Vaccines" page, https://www.zuelligpharma.com/segments/vaccines.',
      },
    },
  ],
};
export const GG_SCHEMA_FAQ__ANIMAL_HEALTH_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma contribute to the field of animal health, and what role does it play in supporting animal health companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma is dedicated to advancing animal health and supports animal health companies with a range of solutions and services.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you provide insights into the animal health partners that collaborate with Zuellig Pharma, and what benefits do they receive from this partnership?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma collaborates with various animal health partners, and these partnerships offer mutual benefits, including access to a broad range of animal health products and solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are some of the key animal health solutions and products offered by Zuellig Pharma, and how do they contribute to the well-being of animals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma offers a comprehensive portfolio of animal health products, including vaccines, feeds, and pharmaceuticals, and solutions designed to improve the health and welfare of animals.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma support animal health products manufacturing and distribution to meet the needs of animal healthcare organisations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide support for the manufacturing and efficient distribution of animal health products, ensuring that animal healthcare organisations have access to the necessary products.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the significance of animal health in the veterinary field, and how does Zuellig Pharma contribute to the betterment of animal healthcare?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Animal health is of utmost importance in the veterinary field. Zuellig Pharma plays a vital role in supporting animal healthcare and contributing to the well-being of animals.',
      },
    },
    {
      '@type': 'Question',
      name: "Where can I find more information about Zuellig Pharma's involvement in animal health, its collaboration with animal health companies, and the range of animal health products and solutions offered?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For comprehensive information about Zuellig Pharma\'s involvement in animal health, partnerships with animal health companies, and the array of animal health products and solutions offered, please visit our website\'s "Animal Health" page, https://www.zuelligpharma.com/segments/animal-health',
      },
    },
  ],
};
export const GG_SCHEMA_FAQ__SPECIALTY_CARE_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What role does Zuellig Pharma play in the field of pharma specialty care and pharmaceutical specialty care?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma is a key player in pharmaceutical specialty care, offering specialised solutions to support patients with complex medical needs.',
      },
    },
    {
      '@type': 'Question',
      name: "Can you explain how Zuellig Pharma's clinical reach extends to specialty care, and what role it plays in advancing clinical trials for specialty drugs?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our clinical reach extends to specialty care, contributing to the advancement of clinical trials and ensuring that specialty drugs reach patients who need them most.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are some of the key services and solutions offered by Zuellig Pharma in the realm of specialty care, and how do they benefit patients and healthcare organisations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma provides a range of services and solutions in specialty care that benefit patients and healthcare organisations by ensuring access to specialty drugs, patient solutions, regulatory framework and new market entry strategies.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Zuellig Pharma support the successful conduct of clinical trials in specialty care, and what is the significance of clinical trials in this field?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Clinical trials are crucial in specialty care. Zuellig Pharma supports the successful conduct of these trials, ensuring that patients have access to innovative specialty treatments.',
      },
    },
    {
      '@type': 'Question',
      name: "What distinguishes Zuellig Pharma's role in specialty care and clinical trials, and how does it stand out in the field of pharmaceutical specialty care?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zuellig Pharma is recognised for its commitment to advancing pharmaceutical distribution, patient care and clinical trials, making it a leader in the field of pharmaceutical specialty care.',
      },
    },
    {
      '@type': 'Question',
      name: "Where can I find more information about Zuellig Pharma's involvement in pharma specialty care, pharmaceutical specialty care, its clinical reach, and its contributions to clinical trials in specialty care?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For comprehensive information about Zuellig Pharma\'s involvement in pharma specialty care, pharmaceutical specialty care, its clinical reach, and its contributions to clinical trials in specialty care, please visit our website\'s "Specialty Care" page, https://www.zuelligpharma.com/segments/specialty-care',
      },
    },
  ],
};
