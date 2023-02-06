import axios from "axios";
import routes from "../constants/routes";
import {ShareBucketReqProps} from "../types"


const shareBuckets = async({shareUsers, shareBuckets}: ShareBucketReqProps) => {
  console.log("ASYNC SHARE", shareUsers, shareBuckets)
  const promises = await shareUsers.map(async(shareUser : string) => {
    const shareBucketsPromises = await shareBuckets.map(async(shareBucket: string) => {
      try {
        const bucketSharedWithUser = await axios.post(routes.SHARE_BUCKET, {shareBucket, shareUser})
        return bucketSharedWithUser
      } catch(err: any) {
        console.log("FAILED TO SHAREr", shareBucket, "WITH", shareUser)
      }
    })

    return shareBucketsPromises;
  })

  const result = await Promise.all(promises)
  return result;
}

const bucketService = {shareBuckets}
export default bucketService;