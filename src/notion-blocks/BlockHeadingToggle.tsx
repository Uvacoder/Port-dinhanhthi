'use client'

import { Disclosure } from '@headlessui/react'
import cn from 'classnames'
import { useContext } from 'react'

import { BlockOptionContext } from '../components/BlockRender'
import BsFillCaretRightFill from '../icons/BsFillCaretRightFill'

type BlockHeadingToggleProps = {
  className?: string
  headingElement: JSX.Element
  anchorRight?: JSX.Element
  children: React.ReactNode
}

export default function BlockHeadingToggle(props: BlockHeadingToggleProps) {
  const ctx = useContext(BlockOptionContext) as any
  return (
    <Disclosure defaultOpen={false}>
      {({ open }) => (
        <>
          <div className={cn('flex w-full items-center gap-1 ml-[-10px]', props.className)}>
            <Disclosure.Button className="rounded-md p-1 hover:bg-[#99989824]">
              <BsFillCaretRightFill
                className={cn('text-lg transform ease-in-out transition-all duration-[400ms]', {
                  'rotate-90': open,
                  'rotate-0': !open
                })}
              />
            </Disclosure.Button>
            {props.headingElement}
            {ctx?.showAnchorRight && props.anchorRight}
          </div>
          <Disclosure.Panel>
            <div>{props.children}</div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
