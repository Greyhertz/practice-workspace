import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

export const Settings = () => {
  const updateName = useAuthStore((state) => state.updateName);
  const currentName = useAuthStore((state) => state.currentUser?.name);
  const email = useAuthStore((state) => state.currentUser?.email)
  const [name, setName] = useState(currentName ?? "");
  const [saved, setSaved] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextName = name.trim();
    if (!nextName) return;

    updateName(nextName);
    setName(nextName);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile and preferences.
        </p>
      </div>

      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-medium">Profile</h2>
          <p className="text-sm text-muted-foreground">
            Update the name shown across your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="display-name" className="text-sm font-medium">
              Display name
            </label>
            <input
              id="display-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              maxLength={60}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!name.trim() || name.trim() === currentName}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save changes
            </button>
            {saved && (
              <span className="text-sm text-muted-foreground">
                Changes saved.
              </span>
            )}
          </div>

            <div className="space-y-2">
            <label htmlFor="display-name" className="text-sm font-medium">
              Email
            </label>
            <input
              disabled
              value={email}
              placeholder="Your name"
              maxLength={60}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </form>

      </section>

      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-medium">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            Choose how you would like to stay informed.
          </p>
        </div>
        <label className="flex cursor-pointer items-center justify-between gap-4">
          <span>
            <span className="block text-sm font-medium">Email updates</span>
            <span className="block text-sm text-muted-foreground">
              Receive helpful updates and reminders by email.
            </span>
          </span>
          <input
            type="checkbox"
            checked={emailUpdates}
            onChange={(event) => setEmailUpdates(event.target.checked)}
            className="h-4 w-4 accent-primary"
          />
        </label>
      </section>
    </div>
  );
};
