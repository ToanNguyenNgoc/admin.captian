import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react"
import { MediaApi } from "../apis";


export type Media = {
  original_url: string;
}

type PostType = {
  e: ChangeEvent<HTMLInputElement>,
  callBack?: (data: Media[]) => void,
  onError?: (error: AxiosError) => void
}

export function usePostMedia() {
  const [loading, setLoading] = useState(false)
  const handlePostMedia = async ({ e, callBack, onError }: PostType) => {
    if (e.target.files) {
      setLoading(true)
      let tempImages: Media[] = []
      for (var j = 0; j < e.target.files?.length; j++) {
        const item = {
          // model_id: -j,
          original_url: URL.createObjectURL(e.target.files[j]),
          // model_type: e.target.files[j].type
        }
        tempImages.push(item)
      }
      if (callBack) { callBack(tempImages) }
      try {
        const mediaList: Media[] = []
        for (var i = 0; i < e.target.files?.length; i++) {
          const fileItem = e.target.files[i]
          let formData = new FormData()
          let resMedia = {
            original_url: URL.createObjectURL(fileItem),
          }
          formData.append('file', fileItem)
          let res: any
          res = await MediaApi.postMedia(formData).then(res => res.data.context)
          if (res) {
            resMedia = { ...resMedia, original_url: res.original_url }
          }
          mediaList.push(resMedia)
        }
        setLoading(false)
        if (callBack) { callBack(mediaList) }
      } catch (error) {
        setLoading(false)
        const err = error as AxiosError
        if (onError) {
          onError(err)
        }
      }
    }
  }
  return {
    handlePostMedia,
    loading
  }
}