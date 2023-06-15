import { Copy } from 'react-feather'
import { DialogCloseButton } from '../dialog/dialogCloseButton'
import { useCopyToClipboard } from 'usehooks-ts';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

//tHash = transaction hash
export interface PodDetailsModalProps {
  link: string;
  tHash: string;
}

export const PodDetailsModal = ({ link, tHash }: PodDetailsModalProps) => {
  const [value, copy] = useCopyToClipboard()
  const [hasCopy, setHasCopy] = useState(false)

  function copyLink() {
    if (link) {
      void copy(link)
      setHasCopy(Boolean(value))
      value && toast.success('Copied to clipboard')
    }
  }

  useEffect(() => {
    if (hasCopy) {
      const id = setTimeout(() => {
        setHasCopy(false)
      }, 3000)
      return () => clearTimeout(id)
    }
  }, [hasCopy, copy])
  return (
    <div className="flex w-[90vw] max-w-[600px] flex-col rounded-lg bg-white p-10 text-center shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
      <DialogCloseButton />
      <div className="flex flex-col gap-4 px-10">
        <h1 className="font-bespoke text-3xl font-bold">
          Link to mint <span className="text-blue-500">POD</span>
        </h1>
        <div>
          <p className="font-supreme">
            <pre className='flex items-center justify-center gap-2'>
              <code className='bg-gray-100 font-supreme italic px-3 py-1 rounded-lg truncate w-96'>{link}</code>
              <button onClick={copyLink} className='flex items-center gap-2 bg-blue-50 hover:bg-blue-100 transition-colors text-blue-600 font-semibold rounded-lg px-2 py-1'>
                <Copy size="14px" />
                <span>
                  {hasCopy ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </pre>
          </p>
          <p className='text-left font-supreme text-sm opacity-50'>Add link to your repo.</p></div>
        <p className='text-left text-sm font-supreme'>
          Explore the NFT on the block <a href={tHash} className='underline text-blue-500'>explorer</a></p>
      </div>
    </div>
  )
}
