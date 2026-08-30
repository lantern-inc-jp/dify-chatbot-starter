import type { FC } from 'react'
import classNames from 'classnames'
import style from './style.module.css'
import { CLIENT_CONFIG } from '@/config/client'

export interface AppIconProps {
  size?: 'xs' | 'tiny' | 'small' | 'medium' | 'large'
  rounded?: boolean
  icon?: string
  background?: string
  className?: string
}

const AppIcon: FC<AppIconProps> = ({
  size = 'medium',
  rounded = false,
  icon,
  background,
  className,
}) => {
  return (
    <span
      className={classNames(
        style.appIcon,
        size !== 'medium' && style[size],
        rounded && style.rounded,
        className ?? '',
      )}
      style={{
        background,
      }}
    >
      <img src={icon || CLIENT_CONFIG.brand.logo} alt={CLIENT_CONFIG.brand.companyName} style={{ width: '60%', height: 'auto' }} />
    </span>
  )
}

export default AppIcon
