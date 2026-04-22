'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRegister } from '@/features/auth/useAuth'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const { mutate: register, isPending } = useRegister()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (password.length < 8) {
      setErrorMsg('Mật khẩu phải có ít nhất 8 ký tự')
      return
    }

    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp')
      return
    }

    register(
      { email, password },
      {
        onError: (error: unknown) => {
          const axiosError = error as {
            response?: { data?: { message?: string } }
          }

          const message =
            axiosError.response?.data?.message ||
            'Đăng ký thất bại. Vui lòng thử lại!'

          setErrorMsg(message)
        },
      }
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#4f6f91] p-4">
      <div className="neu w-full max-w-md space-y-8 rounded-2xl bg-[#4f6f91] p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white text-balance">
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-sm text-gray-200">
            Tham gia History Social ngay hôm nay
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-100"
                htmlFor="email"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="neu-inset mt-1 block w-full rounded-lg border-0 bg-[#4f6f91] px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 sm:text-sm"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-100"
                htmlFor="password"
              >
                Mật khẩu
              </label>

              <input
                id="password"
                type="password"
                required
                placeholder="Ít nhất 8 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="neu-inset mt-1 block w-full rounded-lg border-0 bg-[#4f6f91] px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 sm:text-sm"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-100"
                htmlFor="confirm-password"
              >
                Xác nhận mật khẩu
              </label>

              <input
                id="confirm-password"
                type="password"
                required
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="neu-inset mt-1 block w-full rounded-lg border-0 bg-[#4f6f91] px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 sm:text-sm"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="neu-inset rounded-lg bg-red-500/20 p-3 text-sm text-red-200">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="neu flex w-full justify-center rounded-lg bg-[#4f6f91] px-4 py-3 text-sm font-medium text-white transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#4f6f91] disabled:cursor-not-allowed disabled:opacity-70 active:translate-y-px active:shadow-none"
          >
            {isPending ? 'Đang tạo tài khoản...' : 'Đăng ký'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-200">
          Đã có tài khoản?{' '}
          <Link
            href="/login"
            className="font-medium text-white underline underline-offset-2 hover:text-gray-100"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}