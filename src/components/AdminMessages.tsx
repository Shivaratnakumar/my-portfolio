'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Calendar, User, MessageSquare, Trash2, EyeOff, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Message {
  id: number
  name: string
  email: string
  message: string
  created_at: string
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    console.log('AdminMessages component mounted')
    // Check if user is already authenticated (from localStorage)
    const savedAuth = localStorage.getItem('admin_authenticated')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
      fetchMessages()
    }
  }, [])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
      setError('Failed to fetch messages')
    } finally {
      setLoading(false)
    }
  }

  const deleteMessage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      setDeleting(id)
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setMessages(messages.filter(msg => msg.id !== id))
      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('Failed to delete message')
    } finally {
      setDeleting(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    
    // Simple password check - you can change this password
    const adminPassword = 'admin123' // Change this to your desired password
    
    if (password === adminPassword) {
      setIsAuthenticated(true)
      setShowLogin(false)
      setPassword('')
      localStorage.setItem('admin_authenticated', 'true')
      fetchMessages()
    } else {
      setLoginError('Invalid password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsVisible(false)
    setSelectedMessage(null)
    localStorage.removeItem('admin_authenticated')
  }

  // Login Modal
  if (showLogin) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Access</h2>
            <p className="text-gray-600">Enter password to view contact messages</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-800"
                required
                autoFocus
              />
            </div>
            
            {loginError && (
              <p className="text-red-600 text-sm text-center">{loginError}</p>
            )}
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Login
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    )
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <motion.button
            onClick={() => {
              console.log('Admin button clicked')
              if (isAuthenticated) {
                setIsVisible(true)
              } else {
                setShowLogin(true)
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-2xl transition-shadow duration-300 border-4 border-white ring-4 ring-blue-200"
            title="View Contact Messages (Admin)"
          >
            <MessageSquare size={24} />
          </motion.button>
          {isAuthenticated && messages.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
              {messages.length}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
                 {/* Header */}
         <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
           <div className="flex items-center justify-between">
             <div>
               <h2 className="text-2xl font-bold">Contact Messages</h2>
               <p className="text-blue-100">
                 {loading ? 'Loading...' : `${messages.length} message${messages.length !== 1 ? 's' : ''}`}
               </p>
             </div>
             <div className="flex items-center gap-3">
               <button
                 onClick={fetchMessages}
                 className="text-white hover:text-gray-200 transition-colors duration-300 p-2 rounded-lg hover:bg-white hover:bg-opacity-20"
                 title="Refresh messages"
               >
                 <RefreshCw size={20} />
               </button>
               <button
                 onClick={handleLogout}
                 className="text-white hover:text-gray-200 transition-colors duration-300 p-2 rounded-lg hover:bg-white hover:bg-opacity-20"
                 title="Logout"
               >
                 <EyeOff size={20} />
               </button>
             </div>
           </div>
         </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Messages List */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Loading messages...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-600">{error}</p>
                  <button
                    onClick={fetchMessages}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Retry
                  </button>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No messages yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedMessage?.id === message.id
                          ? 'bg-blue-50 border-2 border-blue-200'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{message.name}</h3>
                        <span className="text-xs text-gray-500">
                          {formatDate(message.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                      <p className="text-xs text-blue-600 mt-1">{message.email}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedMessage ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Message Details</h3>
                                     <button
                     onClick={() => deleteMessage(selectedMessage.id)}
                     disabled={deleting === selectedMessage.id}
                     className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {deleting === selectedMessage.id ? (
                       <>
                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                         Deleting...
                       </>
                     ) : (
                       <>
                         <Trash2 size={16} />
                         Delete
                       </>
                     )}
                   </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <User className="text-blue-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-semibold text-gray-800">{selectedMessage.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Mail className="text-blue-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300"
                        >
                          {selectedMessage.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Received</p>
                      <p className="font-semibold text-gray-800">
                        {formatDate(selectedMessage.created_at)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Message</h4>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare size={64} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Message</h3>
                  <p className="text-gray-500">Choose a message from the list to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminMessages
