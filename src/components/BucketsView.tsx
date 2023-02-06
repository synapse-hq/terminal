import { Box, Text, VStack } from '@chakra-ui/react'
import React from "react"
import BrandButton from './BrandButton'
import BucketsTable from './BucketsTable'
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';

import routes from "../constants/routes"
import useWebSocket from 'react-use-websocket';
import { Bucket, ShareFormProps, UserResult } from "../types"
import bucketService from "../services/bucket"

const BucketsView = () => {
  const [successMessage, setSuccessMesssage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [sharing, setSharing] = useState(false)
  const [buckets, setBuckets] = useState([]);
  const router = useRouter()

  const getBuckets = async() => {
    try {
      const buckets = await axios.get(routes.GET_BUCKETS)
      setBuckets(buckets.data)
    } catch (err: any) {
      setErrorMessage("Could not get buckets")
      router.push("/")
    }
  }

  useEffect(() => {
    getBuckets()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (successMessage) {
        setSuccessMesssage("")
      }

      if (errorMessage) {
        setErrorMessage("")
      }
    }, 7000);
  }, [successMessage, errorMessage])


  const handleCreateBucket = () => {
    fetch(routes.GET_BUCKETS, { method: 'POST', credentials: 'include' })
      .then(response => {
        return response.json();
      }).then(bucket => {
        if (bucket) {
          setBuckets(buckets.concat(bucket))
        } else {
          router.push("/")
        }
      })
      .catch(err => {
        setErrorMessage("Something went wrong, could not create bucket")
      })
  }

  const toggleShareForm = () => {
    setSharing(!sharing);
  }

  if (buckets.length === 0) {
    return (
      <Box>
        <VStack spacing={5}>
          <Text>You have no buckets yet</Text>
          <BrandButton type="secondary" onClick={handleCreateBucket}>Create a Bucket</BrandButton>
        </VStack>
      </Box>
    )
  }
  
  return (
    <Box>
      <BrandButton type="secondary" onClick={handleCreateBucket}>Create a Bucket</BrandButton>
      <BrandButton type="share" onClick={toggleShareForm}>
        { sharing ? "Hide Search" : "Share a bucket"}        
      </BrandButton>
      {errorMessage ? <span className="error-message">{errorMessage}</span> : ""}
      {successMessage ? <span className="success-message">{successMessage}</span> : ""}

      { 
        sharing ? 
        <ShareForm 
          notifyUserError={setErrorMessage}
          notifyUserSuccess={setSuccessMesssage}
          onUserSearch={setSharing} 
          buckets={buckets}/> : 
        ""
      }
      <BucketsTable buckets={buckets}></BucketsTable>
    </Box>
  )

}

enum ReadyState {
  UNINSTANTIATED = -1,
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

const ShareForm = ({onUserSearch, buckets, notifyUserError, notifyUserSuccess} : ShareFormProps) => {
  const [shareUser, setShareUser] = useState("")
  const [userSelections, setUserSelections] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState([])


  const [shareBucket, setShareBucket] = useState("")
  const [bucketSelections, setBucketSelections] = useState<string[]>([])
  const [bucketResults, setBucketResults] = useState(buckets.slice(0, 7))
  
  const [selecting, setSelecting] = useState("users");
  const [validOption, setValidOption] = useState(false);
  
  const { sendMessage, readyState } = useWebSocket(routes.USER_SEARCH_WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: (e: any) => {
      // update optoins in select input
      const results = JSON.parse(e.data);
      const newResults = results.filter((user: UserResult) => 
        !userSelections.find(selected => selected === user.username)
      )
      setSearchResults(newResults)
    },
    onClose: (e: any) => {
      console.log("WebSocket connection closed")
    },
    shouldReconnect: (closeEvent: any) => {
      // do something went connection is lost
      if (selecting === "buckets") {
        return false
      }
      return true
    },
    reconnectAttempts: 12,
    reconnectInterval: 25,
  });

  const handleUserSearch = (e : any) => {
    e.preventDefault()
    const search = e.target.value
    const status = ReadyState[readyState]

    if (ReadyState[readyState] === "CLOSED") {
      onUserSearch(false)
    }

    setShareUser(search)
    setValidOption(false)
    sendMessage(search)
  }

  const handleOptionSelection = (e: any) => {
    if (e.target.tagName === "A") {
      const user = e.target.id;
      setShareUser(user)
      setValidOption(true)
    }
  }
  
  const cancelUserSelection = () => {
    setValidOption(false)
    setShareUser("")
    setSearchResults([])
  }

  const confirmUserSelection = () => {
    setValidOption(false)
    setShareUser("")
    setSearchResults([])
    setUserSelections(userSelections.concat(shareUser))
  }

  const removeUserSelection = (e: any) => {
    const toRemove = e.target.id 
    const newUsers = userSelections.filter(user => user !== toRemove)
    setUserSelections(newUsers);
  }
  
  const confirmUserSelections = () => {
    if (userSelections.length) {
      setSelecting("buckets");
      setValidOption(false)
    } else {
      notifyUserError("You did not select any users");
    }
  }
  
  if (selecting === "users") {
    return (  
      <div className="share-modal">
        <h2>
          Sharing to users: 
          <span className="confirm-selections" onClick={confirmUserSelections}>
            Confirm User Selections
          </span>
        </h2>
        <ul className="user-list">
          {userSelections.map((user: string) => 
            <li key={`${user}-sharing`}>
              {user}
              <span id={user} onClick={removeUserSelection}>❌</span>
            </li>
          )}
        </ul>
          <div className="user-search" onClick={handleOptionSelection}>
          { validOption ? 
            <span className="cancel" onClick={cancelUserSelection}>❌</span> :
            "" }

            <input 
              id="shareUser" name="shareUser" type="text" 
              onChange={handleUserSearch}
              value={shareUser}
              placeholder="search by username"
            />
            
            {searchResults.map((user: UserResult) => 
              <a 
                id={user.username} key={`${user.username}-link`} 
                className={shareUser === user.username ? "selected" : ""}
              >
                {user.username}
              </a>
            )}
          </div>
               
          { validOption ? 
            <span className="confirm" onClick={confirmUserSelection}>✅</span> :
            "" }
      </div>
    )
  }

  const removeBucketSelection = (e: any) => {
    const toRemove = e.target.id
    const newSelections = bucketSelections.filter((bucket: string) => bucket !== toRemove)
    setBucketSelections(newSelections)
  }

  const handleBucketSearch = (e : any) => {
    setShareBucket(e.target.value)
    const filtered = buckets.filter((bucket: Bucket) => 
      bucket.subdomain.startsWith(shareBucket)
    )

    setBucketResults(filtered.slice(0, 7))
  }

  const handleBucketSelection = (e: any) => {
    if (e.target.tagName === "A") {
      const bucket = e.target.id;
      setShareBucket(bucket)
      setValidOption(true)
    }
  }
  

  const confirmBucketSelections = async() => {
    setShareBucket("")
    setBucketResults([])

    if (confirm("Are you sure you want to share these buckets")) {
      const data = {shareUsers: userSelections, shareBuckets: bucketSelections}
      try {
        const res = await bucketService.shareBuckets(data)
        setBucketSelections([])
        setUserSelections([])
        setBucketResults([])
        setShareBucket("")
        setValidOption(false)
        notifyUserSuccess(`User(s) '${userSelections.join("' | '")}' \n\n\n have access to bucket(s): '${bucketSelections.join("' | '")}'`)

      } catch(err) {
        notifyUserError("Something went wrong")
      }
    }
  }

  const cancelBucketSelection = () => {
    setValidOption(false)
    setShareBucket("")
    setBucketResults([])
  }

  const confirmBucketSelection = () => {
    if (validOption) {
      setBucketSelections(bucketSelections.concat(shareBucket))
      setValidOption(false)
      setShareBucket("")
      setBucketResults([])
    }
  }

  return (  
      <div className="share-modal">
        <h2>
          Sharing to Buckets: 
          <span className="confirm-selections" onClick={confirmBucketSelections}>
            Confirm Buckets Selections
          </span>
        </h2>
        <ul className="bucket-list">
          {
            bucketSelections.map((bucket: string) => 
              <li key={bucket}>
                {bucket}
                <span id={bucket} onClick={removeBucketSelection}>❌</span>
              </li>
            )
          }
        </ul>
          <div className="bucket-search" onClick={handleBucketSelection}>
          { validOption ? 
            <span className="cancel" onClick={cancelBucketSelection}>❌</span> :
            "" }

          { validOption ? 
            <span className="confirm" onClick={confirmBucketSelection}>✅</span> :
            "" }

            <input 
              id="shareBucket" name="shareBucket" type="text" 
              onChange={handleBucketSearch}
              value={shareBucket}
              placeholder="search by endpoint"
            />

            {bucketResults.map((bucket: Bucket) => 
              <a id={bucket.subdomain} key={bucket.subdomain}
              className={shareBucket === bucket.subdomain ? "selected" : ""}
              >
                {bucket.subdomain}
              </a>  
            )}
          </div>      
      </div>
  )
}



export default BucketsView
