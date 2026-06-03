import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Settings"
        description="Manage your Yousun Agri360 farmer profile, preferences, language, notifications, and account settings."
      />

      <div className="agri-card rounded-3xl p-8">
        <h2 className="text-2xl font-black text-green-800">
          Settings Module
        </h2>

        <p className="mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-slate-600">
          This page is ready for farmer profile settings, notification
          preferences, language settings, and platform configuration.
        </p>
      </div>
    </DashboardLayout>
  );
}

