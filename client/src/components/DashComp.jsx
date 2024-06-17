export default function DashComp() {
  return (
    <div className="w-full md:h-[full] max-h-[90vh] h-screen  flex flex-col p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  h-[50%] p-4">
        <div className="bg-white rounded-lg overflow-hidden p-5 drop-shadow-lg">
          <div className="flex items-center justify-between bg-white">
            <h1>Users</h1>
            <UsersIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <div className="text-4xl font-bold">2,345</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              +12% from last month
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden p-5 drop-shadow-lg">
          <div className="flex items-center justify-between">
            <h1>Comments</h1>
            <MessageCircleIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <div className="text-4xl font-bold">12,567</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              +8% from last month
            </p>
          </div>
        </div>
      </div>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4  h-[50%] p-4">
        <div className="bg-white rounded-lg overflow-hidden p-5 drop-shadow-lg">
          <div className="flex items-center justify-between">
            <h1>Likes</h1>
            <HeartIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <div className="text-4xl font-bold">45,678</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              +15% from last month
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden p-5 drop-shadow-lg">
          <div className="flex items-center justify-between">
            <h1>Shares</h1>
            <ShareIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <div className="text-4xl font-bold">3,456</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              +10% from last month
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden p-5 drop-shadow-lg">
          <div className="flex items-center justify-between">
            <h1>Active Users</h1>
            <ActivityIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <div className="text-4xl font-bold">1,234</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              +5% from last month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
