"use client";
import FxotaryLayout from "@/layout/FxotaryLayout";

const PrivacyPage = () => {

  return (
    <FxotaryLayout errorPage={false}>
      {/*===============================
        PRIVACY POLICY START
        ===============================*/}
      <section className='privacy_policy pt_120 xs_pt_70 pb_120 xs_pb_70'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='privacy_content'>
                <div className='section_heading mb_50'>
                  <h2 data-text-animation='' data-split='word' data-duration={1}>
                    Privacy Policy
                  </h2>
                  <p>Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className='privacy_section mb_40'>
                  <h3>1. Information We Collect</h3>
                  <p>
                    We collect information you provide directly to us, such as when you create an account, 
                    use our AI text tools, or contact us for support. This may include:
                  </p>
                  <ul>
                    <li>Account information (email, username)</li>
                    <li>Text data you input into our tools for processing</li>
                    <li>Usage analytics and performance metrics</li>
                    <li>Communication records when you contact support</li>
                  </ul>
                </div>

                <div className='privacy_section mb_40'>
                  <h3>2. How We Use Your Information</h3>
                  <p>We use the information we collect to:</p>
                  <ul>
                    <li>Provide and improve our AI text processing services</li>
                    <li>Process your text using our AI algorithms</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send you technical notices and security alerts</li>
                    <li>Analyze usage patterns to improve our services</li>
                  </ul>
                </div>

                <div className='privacy_section mb_40'>
                  <h3>3. Data Processing and AI</h3>
                  <p>
                    When you use our AI text tools, your input text is processed by our AI algorithms. 
                    We want to be transparent about how this works:
                  </p>
                  <ul>
                    <li>Text data is processed in real-time and is not stored permanently</li>
                    <li>We may temporarily cache results to improve performance</li>
                    <li>Your text is not used to train our AI models without explicit consent</li>
                    <li>Processing happens on secure servers with encryption</li>
                  </ul>
                </div>

                <div className='privacy_section mb_40'>
                  <h3>4. Data Sharing</h3>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties, 
                    except in the following circumstances:
                  </p>
                  <ul>
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and safety</li>
                    <li>With trusted service providers who assist in operating our platform</li>
                  </ul>
                </div>

                <div className='privacy_section mb_40'>
                  <h3>5. Data Security</h3>
                  <p>
                    We implement appropriate security measures to protect your information against 
                    unauthorized access, alteration, disclosure, or destruction, including:
                  </p>
                  <ul>
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security audits and monitoring</li>
                    <li>Access controls and authentication measures</li>
                    <li>Secure hosting infrastructure</li>
                  </ul>
                </div>

                <div className='privacy_section mb_40'>
                  <h3>6. Your Rights</h3>
                  <p>You have the right to:</p>
                  <ul>
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt out of non-essential communications</li>
                    <li>Export your data in a portable format</li>
                  </ul>
                </div>

                <div className='privacy_section mb_40'>
                  <h3>7. Cookies and Tracking</h3>
                  <p>
                    We use cookies and similar technologies to improve your experience, analyze usage, 
                    and provide personalized content. You can control cookie preferences through your browser settings.
                  </p>
                </div>

                <div className='privacy_section mb_40'>
                  <h3>8. Changes to Privacy Policy</h3>
                  <p>
                    We may update this privacy policy from time to time. We will notify you of any 
                    material changes by posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date.
                  </p>
                </div>

                <div className='privacy_section mb_40'>
                  <h3>9. Contact Us</h3>
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, 
                    please contact us at:
                  </p>
                  <ul>
                    <li>Email: privacy@aitexttools.com</li>
                    <li>Address: [Your Company Address]</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*===============================
        PRIVACY POLICY END
        ===============================*/}
    </FxotaryLayout>
  );
};

export default PrivacyPage;