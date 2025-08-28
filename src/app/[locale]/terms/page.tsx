"use client";
import FxotaryLayout from "@/layout/FxotaryLayout";

const TermsPage = () => {

  return (
    <FxotaryLayout errorPage={false}>
      {/*===============================
        TERMS OF SERVICE START
        ===============================*/}
      <section className='terms_service pt_120 xs_pt_70 pb_120 xs_pb_70'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='terms_content'>
                <div className='section_heading mb_50'>
                  <h2 data-text-animation='' data-split='word' data-duration={1}>
                    Terms of Service
                  </h2>
                  <p>Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className='terms_section mb_40'>
                  <h3>1. Acceptance of Terms</h3>
                  <p>
                    By accessing and using AI Text Tools, you accept and agree to be bound by the terms 
                    and provision of this agreement. If you do not agree to abide by the above, please 
                    do not use this service.
                  </p>
                </div>

                <div className='terms_section mb_40'>
                  <h3>2. Description of Service</h3>
                  <p>
                    AI Text Tools provides artificial intelligence-powered text processing services, including 
                    but not limited to:
                  </p>
                  <ul>
                    <li>Text summarization and analysis</li>
                    <li>Content generation and editing</li>
                    <li>Language translation and conversion</li>
                    <li>Text formatting and optimization</li>
                    <li>Grammar and style checking</li>
                  </ul>
                </div>

                <div className='terms_section mb_40'>
                  <h3>3. User Responsibilities</h3>
                  <p>As a user of our service, you agree to:</p>
                  <ul>
                    <li>Provide accurate and complete information when required</li>
                    <li>Use the service only for lawful purposes</li>
                    <li>Not attempt to reverse engineer or compromise our AI systems</li>
                    <li>Respect intellectual property rights</li>
                    <li>Not input harmful, illegal, or inappropriate content</li>
                    <li>Not exceed reasonable usage limits</li>
                  </ul>
                </div>

                <div className='terms_section mb_40'>
                  <h3>4. Intellectual Property</h3>
                  <p>
                    You retain ownership of the content you input into our tools. However, by using our service:
                  </p>
                  <ul>
                    <li>You grant us a limited license to process your content</li>
                    <li>You represent that you have the right to use the content you submit</li>
                    <li>Our AI algorithms and software remain our intellectual property</li>
                    <li>Generated content is provided as-is with no ownership claims from us</li>
                  </ul>
                </div>

                <div className='terms_section mb_40'>
                  <h3>5. Service Availability</h3>
                  <p>
                    We strive to provide reliable service, but we cannot guarantee:
                  </p>
                  <ul>
                    <li>Continuous, uninterrupted access to our services</li>
                    <li>That our service will be error-free or bug-free</li>
                    <li>Specific response times or processing speeds</li>
                    <li>Compatibility with all devices or browsers</li>
                  </ul>
                </div>

                <div className='terms_section mb_40'>
                  <h3>6. Limitation of Liability</h3>
                  <p>
                    To the fullest extent permitted by law, AI Text Tools shall not be liable for:
                  </p>
                  <ul>
                    <li>Any indirect, incidental, or consequential damages</li>
                    <li>Loss of data, profits, or business opportunities</li>
                    <li>Errors or inaccuracies in AI-generated content</li>
                    <li>Third-party actions or content</li>
                  </ul>
                </div>

                <div className='terms_section mb_40'>
                  <h3>7. AI Content Disclaimer</h3>
                  <p>
                    Our AI-powered tools generate content based on algorithms and training data:
                  </p>
                  <ul>
                    <li>Generated content may contain errors or inaccuracies</li>
                    <li>Results should be reviewed and verified before use</li>
                    <li>We do not guarantee the accuracy of AI-generated content</li>
                    <li>Users are responsible for fact-checking and validation</li>
                  </ul>
                </div>

                <div className='terms_section mb_40'>
                  <h3>8. Account Termination</h3>
                  <p>
                    We reserve the right to terminate or suspend accounts that:
                  </p>
                  <ul>
                    <li>Violate these terms of service</li>
                    <li>Engage in harmful or abusive behavior</li>
                    <li>Attempt to compromise our systems</li>
                    <li>Use the service for illegal activities</li>
                  </ul>
                </div>

                <div className='terms_section mb_40'>
                  <h3>9. Privacy</h3>
                  <p>
                    Your privacy is important to us. Please review our Privacy Policy, which also 
                    governs your use of our service, to understand our practices.
                  </p>
                </div>

                <div className='terms_section mb_40'>
                  <h3>10. Changes to Terms</h3>
                  <p>
                    We reserve the right to modify these terms at any time. Changes will be effective 
                    immediately upon posting. Continued use of the service constitutes acceptance of 
                    modified terms.
                  </p>
                </div>

                <div className='terms_section mb_40'>
                  <h3>11. Contact Information</h3>
                  <p>
                    For questions about these Terms of Service, please contact us at:
                  </p>
                  <ul>
                    <li>Email: legal@aitexttools.com</li>
                    <li>Address: [Your Company Address]</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*===============================
        TERMS OF SERVICE END
        ===============================*/}
    </FxotaryLayout>
  );
};

export default TermsPage;