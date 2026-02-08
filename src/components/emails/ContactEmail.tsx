import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Tailwind,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  phone,
  service,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                dark: "#0a0a0a",
                "dark-light": "#1a1a1a",
                cyan: "#00d4ff",
                "cyan-dark": "#00a8cc",
              },
            },
          },
        }}
      >
        <Head />
        <Preview>
          New contact request from {name} - {service}
        </Preview>
        <Body className="bg-dark font-sans">
          <Container className="mx-auto my-10 max-w-2xl">
            {/* Header Section */}
            <Section style={{ backgroundColor: '#00d4ff', padding: '24px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', justifyContent: 'center', textAlign: 'center' }}>
              <Heading style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffffff', margin: '0' }}>
                New Contact Request
              </Heading>
            </Section>

            {/* Main Content */}
            <Section style={{ backgroundColor: '#1a1a1a', padding: '32px', paddingTop: '40px' }}>
              {/* Name */}
              <div style={{ marginBottom: '24px', marginTop: '8px' }}>
                <div style={{ borderLeft: '4px solid #00d4ff', paddingLeft: '16px' }}>
                  <Text style={{ color: '#00d4ff', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                    Name
                  </Text>
                  <Text style={{ color: '#ffffff', fontSize: '18px', margin: '0' }}>{name}</Text>
                </div>
              </div>

              <Hr style={{ borderColor: '#374151', margin: '24px 0' }} />

              {/* Email */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ borderLeft: '4px solid #00d4ff', paddingLeft: '16px' }}>
                  <Text style={{ color: '#00d4ff', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                    Email
                  </Text>
                  <Text style={{ color: '#ffffff', fontSize: '18px', margin: '0' }}>{email}</Text>
                </div>
              </div>

              <Hr style={{ borderColor: '#374151', margin: '24px 0' }} />

              {/* Phone */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ borderLeft: '4px solid #00d4ff', paddingLeft: '16px' }}>
                  <Text style={{ color: '#00d4ff', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                    Phone
                  </Text>
                  <Text style={{ color: '#ffffff', fontSize: '18px', margin: '0' }}>{phone}</Text>
                </div>
              </div>

              <Hr style={{ borderColor: '#374151', margin: '24px 0' }} />

              {/* Service */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ borderLeft: '4px solid #00d4ff', paddingLeft: '16px' }}>
                  <Text style={{ color: '#00d4ff', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                    Service Requested
                  </Text>
                  <Text style={{ color: '#ffffff', fontSize: '18px', margin: '0' }}>{service}</Text>
                </div>
              </div>

              <Hr style={{ borderColor: '#374151', margin: '24px 0' }} />

              {/* Message */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ borderLeft: '4px solid #00d4ff', paddingLeft: '16px' }}>
                  <Text style={{ color: '#00d4ff', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                    Message
                  </Text>
                  <div style={{ backgroundColor: '#0a0a0a', borderRadius: '8px', padding: '16px', marginTop: '12px' }}>
                    <Text style={{ color: '#d1d5db', fontSize: '16px', lineHeight: '1.6', margin: '0', whiteSpace: 'pre-wrap' }}>
                      {message}
                    </Text>
                  </div>
                </div>
              </div>
            </Section>

            {/* Footer */}
            <Section style={{ backgroundColor: '#0a0a0a', padding: '24px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', borderTop: '1px solid #1f2937' }}>
              <Text style={{ color: '#6b7280', fontSize: '14px', textAlign: 'center', margin: '0' }}>
                This email was sent from{" "}
                <span style={{ color: '#00d4ff', fontWeight: '600' }}>The Rift</span>{" "}
                contact form
              </Text>
              <Text style={{ color: '#4b5563', fontSize: '12px', textAlign: 'center', margin: '8px 0 0 0' }}>
                © 2026 The Rift Travel Agency
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
