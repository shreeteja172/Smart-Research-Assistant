export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WelcomeCardProps {
  user: User;
}

export function WelcomeCard({ user }: WelcomeCardProps) {
  const fullName =
    user.name && user.name ? `${user.name}` : user.name || "User";

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Welcome, {fullName}! 👋
      </h1>
    </div>
  );
}
