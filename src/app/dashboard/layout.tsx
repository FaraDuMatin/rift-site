export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 
        Hide the global Navbar and Footer inside /dashboard.
        The sidebar replaces them.
      */}
      <style>{`
        body > nav,
        body > footer {
          display: none !important;
        }
      `}</style>

      {children}
    </>
  );
}
