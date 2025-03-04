// @todo - add/use to, href, and onClick props

import React from 'react'
import { Link } from 'gatsby'

import { CornerBrackets } from '../CornerBrackets'
import { mergeClassList } from '../../lib/utils'

import rocketImg from './images/rocket.svg'
import calendarImg from './images/calendar.svg'
import githubImg from './images/github.svg'
import handbookImg from './images/handbook.svg'
import roadmapImg from './images/roadmap.svg'
import checkImg from './images/check.svg'
import bookImg from './images/book.svg'
import downArrow from './images/down-arrow.svg'
import readDarkImg from './images/read-dark.svg'

interface CallToActionProps {
    onClick?: () => void
    className?: string
    type?: string
    icon?: string
    iconBg?: string
    children: any
    width?: string
    href?: string
    to?: string
    displayBrackets?: boolean
}

const icons = {
    rocket: rocketImg,
    calendar: calendarImg,
    github: githubImg,
    handbook: handbookImg,
    roadmap: roadmapImg,
    check: checkImg,
    book: bookImg,
    'down-arrow': downArrow,
    'read-dark': readDarkImg,
    none: null,
}

const buttonTypeClasses = {
    secondary:
        'bg-transparent border-3 border-white border-opacity-30 text-white mt-2 hover:bg-white hover:bg-opacity-10 hover:text-white',
    primary:
        'brackets rounded-sm bg-primary border-primary text-white hover:border-primary-dark hover:bg-primary-dark hover:text-white',
    custom: '',
}

export const CallToAction = ({
    className = '',
    type = 'primary',
    icon = 'none',
    iconBg = 'bg-yellow-100',
    children,
    width = '64',
    href,
    to,
    onClick,
    displayBrackets = false,
}: CallToActionProps) => {
    const iconNode = icons[icon] ? (
        <div className={`${iconBg} bg-opacity-10  rounded rounded-sm p-2 mr-8`}>
            <img src={icons[icon]} className="h-4 w-4 mb-0" alt="Get started with PostHog" />
        </div>
    ) : null

    const brackets = type === 'primary' || displayBrackets ? <CornerBrackets /> : null

    const widthClass = `w-${width}`
    const baseClasses = `p-2 ${widthClass} uppercase rounded-sm inline-flex items-center justify-between select-none text-base font-gosha relative button`
    const classList = mergeClassList(baseClasses, buttonTypeClasses[type], className)

    const innerHtml = (
        <>
            {brackets}
            {iconNode}
            <div className="mr-8 button-label">{children}</div>
            <span></span>
        </>
    )

    return href ? (
        <a href={href} target="_blank" className={classList} rel="noreferrer">
            {innerHtml}
        </a>
    ) : to ? (
        <Link to={to} className={classList}>
            {innerHtml}
        </Link>
    ) : (
        <button onClick={onClick} className={classList}>
            {innerHtml}
        </button>
    )
}
