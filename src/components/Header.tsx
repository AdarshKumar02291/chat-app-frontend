import { MessageCircle, Search, Send, Users } from "lucide-react";
function Header({ user }: any) {
  return (
    <div className="bg-white shadow-sm border-b w-full max-w-7xl">
      <div className=" mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageCircle className="h-6 w-6 text-indigo-600" />
          <h1 className="text-xl font-semibold text-gray-900">ChatApp</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-indigo-600">
                {user?.firstName?.[0]}
              </span>
            </div>
            <span className="text-sm text-gray-700">{user?.firstName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
