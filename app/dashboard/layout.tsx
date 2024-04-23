//import LayoutGrid from "@/dashboard/components/layout";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* <LayoutGrid>{children}</LayoutGrid> */}
      {children}
    </section>
  );
}
