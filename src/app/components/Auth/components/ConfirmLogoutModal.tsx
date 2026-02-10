import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../stores/AuthContext";
import { X } from "lucide-react";

export function ConfirmLogoutModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        {/* Overlay */}
        <AlertDialog.Overlay className="z-50 fixed inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Modal Content */}
        <AlertDialog.Content className="z-50 fixed top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <AlertDialog.Title className="text-lg font-semibold text-gray-800">
              خروج از حساب
            </AlertDialog.Title>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5 text-gray-600 hover:text-gray-900" />
            </button>
          </div>

          {/* Body */}
          <AlertDialog.Description className="mt-2 text-gray-600 text-sm">
            آیا می‌خواهید از حساب کاربری خارج شوید؟
          </AlertDialog.Description>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-100">
                خیر
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={() => {
                  logout();
                  navigate("/login", { replace: true }); // redirect immediately
                  setOpen(false);
                }}
                className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                بله، خروج
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
