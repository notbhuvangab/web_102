import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

interface PostCardProps {
  id: string
  title: string
  createdAt: string
  upvotesCount: number
  displayName: string
  imageUrl?: string
  content?: string
  flag?: string
  referencedPostId?: string
  showContentOnFeed?: boolean
  showImageOnFeed?: boolean
  spotifyData?: {
    title?: string
    artist?: string
    imageUrl?: string
  }
}

export function PostCard({
  id,
  title,
  createdAt,
  upvotesCount,
  displayName,
  imageUrl,
  content,
  flag,
  referencedPostId,
  showContentOnFeed,
  showImageOnFeed,
  spotifyData,
}: PostCardProps) {
  const shouldShowImage = (showImageOnFeed && imageUrl) || spotifyData?.imageUrl
  const shouldShowContent = showContentOnFeed && content

  return (
    <Link to={`/posts/${id}`}>
      <div className="border-4 border-foreground p-6 hover:bg-foreground hover:text-background transition-colors cursor-pointer bg-background text-foreground">
        <div className="flex gap-4">
          {shouldShowImage && (
            <div className="flex-shrink-0">
              <img
                src={imageUrl || spotifyData?.imageUrl}
                alt={title}
                className="w-20 h-20 object-cover border-4 border-foreground"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-black tracking-tight line-clamp-2">{title}</h3>
              {flag && (
                <span className="text-xs font-black uppercase px-2 py-1 border-2 border-foreground bg-background text-foreground">
                  {flag}
                </span>
              )}
              {referencedPostId && (
                <span className="text-xs font-black uppercase px-2 py-1 border-2 border-foreground bg-background text-foreground">
                  REPOST
                </span>
              )}
            </div>
            
            {spotifyData && (
              <p className="text-sm font-mono mb-3">
                {spotifyData.artist}
              </p>
            )}

            {shouldShowContent && (
              <p className="text-sm mb-3 line-clamp-3 opacity-80">{content}</p>
            )}
            
            <div className="flex gap-4 text-xs font-black uppercase">
              <span>{upvotesCount} UPVOTES</span>
              <span>by {displayName}</span>
              <span>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
