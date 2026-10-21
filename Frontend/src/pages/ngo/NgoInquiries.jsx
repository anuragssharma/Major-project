import React, { useState, useEffect, useMemo } from 'react';
import api from '../../api/axios';
import {
  Mail,
  MessageSquare,
  Trash2,
  Search,
  X,
  User,
  Clock,
  Tag,
  CheckCircle,
  Eye
} from 'lucide-react';

export default function NgoInquiries() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deletingId, setDeletingId] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/messages');
      setMessages(res.data || []);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/messages/${id}/status`, { status });
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status } : m))
      );
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDeleteMessage = async (id, subject) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete inquiry "${subject || 'this message'}"?`
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await api.delete(`/messages/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete inquiry');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesStatus =
        statusFilter === 'ALL' || (m.status || 'UNREAD') === statusFilter;

      if (!matchesStatus) return false;
      if (!searchTerm.trim()) return true;

      const query = searchTerm.toLowerCase();
      const subject = (m.subject || '').toLowerCase();
      const name = (m.name || '').toLowerCase();
      const email = (m.email || '').toLowerCase();
      const text = (m.message || '').toLowerCase();

      return (
        subject.includes(query) ||
        name.includes(query) ||
        email.includes(query) ||
        text.includes(query)
      );
    });
  }, [messages, searchTerm, statusFilter]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-500">Loading user inquiries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Donor & Public Inquiries</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Showing <strong className="text-emerald-700">{filteredMessages.length}</strong> of {messages.length} messages
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Search sender, subject, keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-sm"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            {['ALL', 'UNREAD', 'READ', 'RESOLVED'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  statusFilter === status
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
          <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-2" />
          <h3 className="font-bold text-gray-700 text-base">No Inquiries Found</h3>
          <p className="text-xs text-gray-400 mt-1">
            {searchTerm
              ? `No inquiries matching "${searchTerm}". Try a different search term.`
              : 'There are currently no inquiries in this category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filteredMessages.map((m) => {
            const isUnread = m.status === 'UNREAD';

            return (
              <div
                key={m._id}
                className={`rounded-2xl border bg-white shadow-sm transition overflow-hidden ${
                  isUnread
                    ? 'border-emerald-400 ring-2 ring-emerald-500/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Header Strip */}
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* Sender Initial Avatar */}
                    <div className="w-11 h-11 rounded-xl bg-[#054425] text-white flex items-center justify-center font-black text-sm uppercase shadow-sm">
                      {m.name ? m.name.charAt(0) : 'U'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-900 text-sm">{m.name}</span>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                            m.status === 'UNREAD'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : m.status === 'RESOLVED'
                              ? 'bg-gray-100 text-gray-600 border-gray-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {m.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <a
                          href={`mailto:${m.email}`}
                          className="font-medium text-emerald-800 hover:underline"
                        >
                          {m.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Submission Timestamp */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{new Date(m.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Body & Content Area */}
                <div className="p-5 space-y-4">
                  {/* Subject Line */}
                  <div className="flex items-start gap-2">
                    <Tag className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                        Subject
                      </span>
                      <h4 className="text-sm font-bold text-gray-900 mt-0.5">{m.subject}</h4>
                    </div>
                  </div>

                  {/* Formatted Message Box */}
                  <div className="rounded-xl border border-gray-200/80 bg-gray-50/70 p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                      Message Content
                    </span>
                    <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {m.message}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-5 py-3.5 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
                  <a
                    href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-sm transition"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Reply via Email
                  </a>

                  <div className="flex items-center gap-2">
                    {m.status === 'UNREAD' && (
                      <button
                        onClick={() => handleUpdateStatus(m._id, 'READ')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-700 transition shadow-xs"
                      >
                        <Eye className="h-3.5 w-3.5 text-gray-400" />
                        Mark Read
                      </button>
                    )}
                    {m.status !== 'RESOLVED' && (
                      <button
                        onClick={() => handleUpdateStatus(m._id, 'RESOLVED')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl transition"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        Mark Resolved
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMessage(m._id, m.subject)}
                      disabled={deletingId === m._id}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-200 transition disabled:opacity-50"
                      title="Delete inquiry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}