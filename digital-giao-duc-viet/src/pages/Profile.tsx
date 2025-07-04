// src/pages/Profile.tsx
import { useRef, useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from 'lucide-react';

const DEFAULT_AVATAR = '';

const Profile = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState({
    avatar: DEFAULT_AVATAR,
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: '********'
  });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(DEFAULT_AVATAR);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        toast({ title: "Lỗi", description: "Không thể tải hồ sơ", variant: "destructive" });
        return;
      }

      const { data: profile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (fetchError || !profile) {
        toast({ title: "Lỗi", description: "Không thể tải hồ sơ", variant: "destructive" });
        return;
      }

      setUserData({
        avatar: profile.avatar || DEFAULT_AVATAR,
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        gender: profile.gender || '',
        password: '********'
      });
      setAvatarPreview(profile.avatar || DEFAULT_AVATAR);
    };

    fetchProfile();
  }, [toast]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setUserData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(undefined);
    setUserData(prev => ({ ...prev, avatar: DEFAULT_AVATAR }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (passwords.new && passwords.new !== passwords.confirm) {
      toast({ title: "Lỗi", description: "Mật khẩu mới không khớp", variant: "destructive" });
      return;
    }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        avatar: avatarPreview,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        gender: userData.gender,
      })
      .eq("id", user.id);

    if (error) {
      toast({ title: "Lỗi", description: "Không thể lưu thông tin", variant: "destructive" });
    } else {
      toast({ title: "Thành công", description: "Thông tin đã được cập nhật!" });
    }
  };

  return (
    <div className="relative flex justify-center items-start min-h-[calc(100vh-80px)] py-8" style={{ background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 50%, #f9d976 100%)' }}>
      <div className="absolute inset-0 -z-20">
        <img src="/profile-bg.svg" alt="bg" className="w-full h-full object-cover opacity-70" />
        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-white opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[260px] h-[260px] bg-pink-200 opacity-20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[180px] h-[180px] bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-1/3 w-[200px] h-[200px] bg-pink-100 opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute top-[120px] left-[calc(50%-180px)] w-32 h-32 bg-pink-300 opacity-50 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-[120px] right-[calc(50%-180px)] w-24 h-24 bg-pink-400 opacity-40 rounded-full blur-md animate-pulse"></div>
        <div className="absolute top-[60%] left-[20%] w-20 h-20 bg-pink-200 opacity-50 rounded-full blur-md animate-pulse"></div>
        <div className="absolute top-[30%] right-[15%] w-16 h-16 bg-pink-400 opacity-30 rounded-full blur animate-pulse"></div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-white opacity-40 rounded-full blur-2xl -z-10"></div>
      <div className="w-full max-w-lg mx-auto px-2 relative z-10">
        <Card className="rounded-3xl shadow-2xl bg-white/70 border border-white/40 backdrop-blur-xl relative overflow-hidden pt-4 pb-4 px-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-center mb-2 text-pink-500">Hồ Sơ Cá Nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-full bg-gray-100 mb-6">
                <TabsTrigger value="profile" className="rounded-full">Thông Tin Cá Nhân</TabsTrigger>
                <TabsTrigger value="security" className="rounded-full">Bảo Mật</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative group">
                    <Avatar className="w-24 h-24 ring-4 ring-pink-300 shadow-xl transition-transform duration-200 hover:scale-105">
                      <AvatarImage src={avatarPreview} />
                      <AvatarFallback className="text-xl bg-gray-100">{userData.name.split(' ').map(w=>w[0]).join('').toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {avatarPreview && (
                      <button
                        onClick={handleRemoveAvatar}
                        className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow hover:bg-pink-100 transition"
                        title="Xoá ảnh"
                        type="button"
                      >
                        <svg width="20" height="20" fill="none" stroke="#e11d48" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Label htmlFor="avatar" className="cursor-pointer">
                      <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                        Thay đổi ảnh đại diện
                      </Button>
                    </Label>
                    <Input
                      id="avatar"
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gender">Giới tính</Label>
                    <select
                      id="gender"
                      name="gender"
                      value={userData.gender}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2"
                      title="Giới tính"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="security" className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2 relative">
                    <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                    <Input
                      id="current-password"
                      name="current"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu hiện tại"
                      value={passwords.current}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center pt-6"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                    </button>
                  </div>
                  <div className="grid gap-2 relative">
                    <Label htmlFor="new-password">Mật khẩu mới</Label>
                    <Input
                      id="new-password"
                      name="new"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu mới"
                      value={passwords.new}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center pt-6"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                    </button>
                  </div>
                  <div className="grid gap-2 relative">
                    <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                    <Input
                      id="confirm-password"
                      name="confirm"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu mới"
                      value={passwords.confirm}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center pt-6"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end mt-6 space-x-4">
              <Button variant="outline" className="rounded-full px-6 py-2">Hủy</Button>
              <Button className="rounded-full px-6 py-2 bg-pink-500 hover:bg-pink-400 text-white font-semibold shadow-lg transition" onClick={handleSave}>Lưu thay đổi</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <img src="/wave.svg" alt="wave" className="absolute left-0 bottom-0 w-full pointer-events-none select-none" style={{zIndex:0}} />
    </div>
  );
};

export default Profile;
