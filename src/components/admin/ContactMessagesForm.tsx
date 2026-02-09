import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Mail, MailOpen, RefreshCw } from 'lucide-react';

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export function ContactMessagesForm() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setMessages(data);
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id);

    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, is_read: true } : msg
    ));
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    await supabase.from('contact_messages').delete().eq('id', id);
    setMessages(messages.filter(msg => msg.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  if (loading) return <div className="text-white">Loading messages...</div>;

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Contact Messages</h2>
          {unreadCount > 0 && (
            <p className="text-indigo-400 text-sm mt-1">
              {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No messages yet</p>
          <p className="text-gray-500 text-sm mt-1">
            Messages from your contact form will appear here
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Message List */}
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.is_read) markAsRead(msg.id);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedMessage?.id === msg.id
                    ? 'bg-indigo-900/30 border-indigo-500'
                    : msg.is_read
                    ? 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                    : 'bg-gray-900 border-indigo-500/50 hover:border-indigo-500'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {msg.is_read ? (
                      <MailOpen className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className={`font-medium truncate ${msg.is_read ? 'text-gray-300' : 'text-white'}`}>
                        {msg.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{msg.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMessage(msg.id);
                    }}
                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                  {msg.message}
                </p>
                <p className="text-gray-600 text-xs mt-2">
                  {formatDate(msg.created_at)}
                </p>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:sticky lg:top-8">
            {selectedMessage ? (
              <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {selectedMessage.name}
                    </h3>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-indigo-400 hover:text-indigo-300 text-sm"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: Your message from my portfolio`}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm transition-colors"
                  >
                    Reply
                  </a>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  {formatDate(selectedMessage.created_at)}
                </p>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl text-center">
                <MailOpen className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
