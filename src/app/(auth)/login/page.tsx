'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLogin } from '@/features/auth/useAuth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const { mutate: login, isPending } = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    login(
      { email, password },
      {
        onError: (error: unknown) => {
          const axiosError = error as { response?: { data?: { message?: string } } }
          const message = axiosError.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại!'
          setErrorMsg(message)
        },
      }
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#4f6f91] p-4">
      <div className="neu-raised w-full max-w-md space-y-8 rounded-2xl bg-[#4f6f91] p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white text-balance">
            Đăng nhập
          </h2>
          <p className="mt-2 text-sm text-gray-200">
            Chào mừng bạn quay trở lại History Social
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
                className="neu-inset mt-1 block w-full rounded-lg border-0 bg-[#4f6f91] px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 sm:text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="neu-inset mt-1 block w-full rounded-lg border-0 bg-[#4f6f91] px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            className="neu flex w-full justify-center rounded-lg bg-[#4f6f91] px-4 py-3 text-sm font-medium text-white transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#4f6f91] disabled:cursor-not-allowed disabled:opacity-70 active:shadow-none active:translate-y-px"
          >
            {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-200">
          {'Chưa có tài khoản? '}
          <Link
            href="/register"
            className="font-medium text-white underline underline-offset-2 hover:text-gray-100"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}