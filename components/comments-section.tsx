"use client"

import { useState } from "react"
import { Heart, MessageCircle, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

interface Reply {
  id: string | number
  userId: number // Added userId field for proper profile navigation
  user: string
  username: string
  avatar: string
  comment: string
  time: string
  likes: number
}

interface Comment {
  id: string | number
  userId: number // Added userId field for proper profile navigation
  user: string
  username: string
  avatar: string
  comment: string
  time: string
  likes: number
  replies: Reply[]
}

interface CommentsSectionProps {
  comments: Comment[]
  onAddComment: (comment: string) => void
  onAddReply?: (commentId: string | number, reply: string) => void
  onLikeComment?: (commentId: string | number) => void
  onLikeReply?: (commentId: string | number, replyId: string | number) => void
  placeholder?: string
  title?: string
  showLikesCount?: boolean
  likesCount?: number
  className?: string
  currentPath?: string
}

export default function CommentsSection({
  comments,
  onAddComment,
  onAddReply,
  onLikeComment,
  onLikeReply,
  placeholder = "Add a comment...",
  title = "Comments",
  showLikesCount = false,
  likesCount = 0,
  className = "",
  currentPath,
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | number | null>(null)
  const [replyText, setReplyText] = useState("")
  const [likedComments, setLikedComments] = useState<Set<string | number>>(new Set())
  const [likedReplies, setLikedReplies] = useState<Set<string>>(new Set())
  const router = useRouter()

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment)
      setNewComment("")
    }
  }

  const handleAddReply = (commentId: string | number) => {
    if (replyText.trim() && onAddReply) {
      onAddReply(commentId, replyText)
      setReplyText("")
      setReplyingTo(null)
    }
  }

  const handleLikeComment = (commentId: string | number) => {
    const newLikedComments = new Set(likedComments)
    if (likedComments.has(commentId)) {
      newLikedComments.delete(commentId)
    } else {
      newLikedComments.add(commentId)
    }
    setLikedComments(newLikedComments)
    onLikeComment?.(commentId)
  }

  const handleLikeReply = (commentId: string | number, replyId: string | number) => {
    const replyKey = `${commentId}-${replyId}`
    const newLikedReplies = new Set(likedReplies)
    if (likedReplies.has(replyKey)) {
      newLikedReplies.delete(replyKey)
    } else {
      newLikedReplies.add(replyKey)
    }
    setLikedReplies(newLikedReplies)
    onLikeReply?.(commentId, replyId)
  }

  const handleUserClick = (userId: string | number) => {
    const cleanUserId = String(userId).split("?")[0]
    const fromParam = currentPath ? `?from=${encodeURIComponent(currentPath)}` : ""
    router.push(`/profile/user/${cleanUserId}${fromParam}`)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          {title} ({comments.length})
        </h3>

        {/* Add Comment */}
        <div className="space-y-3">
          <div className="flex space-x-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <Textarea
                placeholder={placeholder}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="resize-none border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              <div className="flex space-x-3 items-start">
                <button onClick={() => handleUserClick(comment.userId)} className="flex-shrink-0">
                  {" "}
                  {/* Use userId instead of comment.id */}
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{comment.user[0]}</AvatarFallback>
                  </Avatar>
                </button>
                <div className="flex-1 min-w-0">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <button
                        onClick={() => handleUserClick(comment.userId)} // Use userId instead of comment.id
                        className="font-semibold text-gray-900 text-sm hover:text-orange-500 transition-colors"
                      >
                        {comment.user}
                      </button>
                      <button
                        onClick={() => handleUserClick(comment.userId)} // Use userId instead of comment.id
                        className="text-xs text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        {comment.username}
                      </button>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{comment.comment}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <button
                      className={`hover:text-red-500 transition-colors flex items-center font-medium ${
                        likedComments.has(comment.id) ? "text-red-500" : "text-gray-500"
                      }`}
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${likedComments.has(comment.id) ? "fill-current" : ""}`} />
                      {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                    </button>
                    <span>{comment.time}</span>
                    {onAddReply && (
                      <button
                        className="hover:text-orange-500 transition-colors"
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      >
                        Reply
                      </button>
                    )}
                  </div>

                  {/* Reply Input */}
                  {replyingTo === comment.id && onAddReply && (
                    <div className="mt-3 flex space-x-2">
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <Textarea
                          placeholder={`Reply to ${comment.user}...`}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="resize-none text-sm border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                          rows={2}
                        />
                        <div className="flex justify-end mt-2 space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setReplyingTo(null)
                              setReplyText("")
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleAddReply(comment.id)}
                            disabled={!replyText.trim()}
                            size="sm"
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-12 space-y-3">
                  {comment.replies.map((reply) => {
                    const replyKey = `${comment.id}-${reply.id}`
                    return (
                      <div key={reply.id} className="flex space-x-3 items-start">
                        <button onClick={() => handleUserClick(reply.userId)} className="flex-shrink-0">
                          {" "}
                          {/* Use userId instead of reply.id */}
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{reply.user[0]}</AvatarFallback>
                          </Avatar>
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="bg-gray-100 rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-1">
                              <button
                                onClick={() => handleUserClick(reply.userId)} // Use userId instead of reply.id
                                className="font-semibold text-gray-900 text-sm hover:text-orange-500 transition-colors"
                              >
                                {reply.user}
                              </button>
                              <button
                                onClick={() => handleUserClick(reply.userId)} // Use userId instead of reply.id
                                className="text-xs text-gray-500 hover:text-orange-500 transition-colors"
                              >
                                {reply.username}
                              </button>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{reply.comment}</p>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <button
                              className={`hover:text-red-500 transition-colors flex items-center font-medium ${
                                likedReplies.has(replyKey) ? "text-red-500" : "text-gray-500"
                              }`}
                              onClick={() => handleLikeReply(comment.id, reply.id)}
                            >
                              <Heart className={`h-3 w-3 mr-1 ${likedReplies.has(replyKey) ? "fill-current" : ""}`} />
                              {reply.likes + (likedReplies.has(replyKey) ? 1 : 0)}
                            </button>
                            <span>{reply.time}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
