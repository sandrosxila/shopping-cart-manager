import { SkeletonCards } from '@/components/skeleton-cards'
import React from 'react'

export default function Loading() {
  return (
    <div className="container flex grow justify-center w-full self-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SkeletonCards length={12} />
      </div>
    </div>
  )
}
