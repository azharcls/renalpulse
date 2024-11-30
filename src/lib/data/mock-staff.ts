import { Staff } from '../types/staff';

export const mockStaff: Staff[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wong',
    position: 'medical_officer',
    email: 'sarah.wong@renalpulse.com',
    phone: '012-345-6789',
    status: 'On Duty',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'Michael Wong',
      relationship: 'Spouse',
      phone: '012-345-6780',
      address: '123 Jalan Ampang, 50450 Kuala Lumpur'
    },
    schedule: {
      shift: 'Morning',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '2',
    name: 'Nurul Huda binti Ahmad',
    position: 'post_basic_nurse',
    email: 'nurul.huda@renalpulse.com',
    phone: '012-345-6781',
    status: 'On Duty',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'Ahmad Ibrahim',
      relationship: 'Father',
      phone: '012-345-6782',
      address: '45 Jalan Bangsar, 59100 Kuala Lumpur'
    },
    schedule: {
      shift: 'Morning',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '3',
    name: 'Raj Kumar',
    position: 'dialysis_assistant',
    email: 'raj.kumar@renalpulse.com',
    phone: '012-345-6783',
    status: 'On Duty',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'Priya Kumar',
      relationship: 'Sister',
      phone: '012-345-6784',
      address: '78 Jalan Ipoh, 51200 Kuala Lumpur'
    },
    schedule: {
      shift: 'Evening',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '4',
    name: 'Lisa Tan',
    position: 'staff_nurse',
    email: 'lisa.tan@renalpulse.com',
    phone: '012-345-6785',
    status: 'On Leave',
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'David Tan',
      relationship: 'Brother',
      phone: '012-345-6786',
      address: '90 Jalan Pudu, 55100 Kuala Lumpur'
    },
    schedule: {
      shift: 'Morning',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '5',
    name: 'Ahmad bin Abdullah',
    position: 'admin_staff',
    email: 'ahmad.abdullah@renalpulse.com',
    phone: '012-345-6787',
    status: 'On Duty',
    photo: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'Fatimah Abdullah',
      relationship: 'Mother',
      phone: '012-345-6788',
      address: '123 Jalan Cheras, 56100 Kuala Lumpur'
    },
    schedule: {
      shift: 'Morning',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '6',
    name: 'Dr. James Chen',
    position: 'medical_officer',
    email: 'james.chen@renalpulse.com',
    phone: '012-345-6789',
    status: 'On Duty',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'Mary Chen',
      relationship: 'Spouse',
      phone: '012-345-6790',
      address: '45 Jalan Imbi, 55100 Kuala Lumpur'
    },
    schedule: {
      shift: 'Evening',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '7',
    name: 'Siti Aminah',
    position: 'staff_nurse',
    email: 'siti.aminah@renalpulse.com',
    phone: '012-345-6791',
    status: 'Off Duty',
    photo: 'https://images.unsplash.com/photo-1595228702420-b3640e9a9c85?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'Ibrahim Hassan',
      relationship: 'Spouse',
      phone: '012-345-6792',
      address: '67 Jalan Klang Lama, 58000 Kuala Lumpur'
    },
    schedule: {
      shift: 'Night',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '8',
    name: 'David Wong',
    position: 'dialysis_assistant',
    email: 'david.wong@renalpulse.com',
    phone: '012-345-6793',
    status: 'On Duty',
    photo: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'Jenny Wong',
      relationship: 'Sister',
      phone: '012-345-6794',
      address: '89 Jalan Kepong, 52100 Kuala Lumpur'
    },
    schedule: {
      shift: 'Evening',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '9',
    name: 'Aisha binti Mohammed',
    position: 'post_basic_nurse',
    email: 'aisha.mohammed@renalpulse.com',
    phone: '012-345-6795',
    status: 'On Duty',
    photo: 'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'Mohammed Ibrahim',
      relationship: 'Father',
      phone: '012-345-6796',
      address: '34 Jalan Sentul, 51000 Kuala Lumpur'
    },
    schedule: {
      shift: 'Night',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '10',
    name: 'Kumar Patel',
    position: 'support_staff',
    email: 'kumar.patel@renalpulse.com',
    phone: '012-345-6797',
    status: 'On Duty',
    photo: 'https://images.unsplash.com/photo-1600878459138-e1123b37cb30?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'Anita Patel',
      relationship: 'Spouse',
      phone: '012-345-6798',
      address: '56 Jalan Brickfields, 50470 Kuala Lumpur'
    },
    schedule: {
      shift: 'Morning',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '11',
    name: 'Michelle Lee',
    position: 'staff_nurse',
    email: 'michelle.lee@renalpulse.com',
    phone: '012-345-6799',
    status: 'On Leave',
    photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'Robert Lee',
      relationship: 'Father',
      phone: '012-345-6800',
      address: '78 Jalan Bukit Bintang, 55100 Kuala Lumpur'
    },
    schedule: {
      shift: 'Evening',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '12',
    name: 'Zainab Hussein',
    position: 'dialysis_assistant',
    email: 'zainab.hussein@renalpulse.com',
    phone: '012-345-6801',
    status: 'On Duty',
    photo: 'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'Hussein Ahmad',
      relationship: 'Father',
      phone: '012-345-6802',
      address: '90 Jalan Masjid India, 50100 Kuala Lumpur'
    },
    schedule: {
      shift: 'Night',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '13',
    name: 'Tan Wei Ming',
    position: 'admin_staff',
    email: 'weiming.tan@renalpulse.com',
    phone: '012-345-6803',
    status: 'On Duty',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'Tan Mei Ling',
      relationship: 'Sister',
      phone: '012-345-6804',
      address: '23 Jalan Petaling, 50000 Kuala Lumpur'
    },
    schedule: {
      shift: 'Morning',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '14',
    name: 'Kavitha Raj',
    position: 'staff_nurse',
    email: 'kavitha.raj@renalpulse.com',
    phone: '012-345-6805',
    status: 'Off Duty',
    photo: 'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'Raj Kumar',
      relationship: 'Father',
      phone: '012-345-6806',
      address: '45 Jalan Tuanku Abdul Rahman, 50100 Kuala Lumpur'
    },
    schedule: {
      shift: 'Evening',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },
  {
    id: '15',
    name: 'Lee Chong Wei',
    position: 'support_staff',
    email: 'chongwei.lee@renalpulse.com',
    phone: '012-345-6807',
    status: 'On Duty',
    photo: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=500&auto=format&fit=crop&q=60',
    emergencyContact: {
      name: 'Lee Mei Fen',
      relationship: 'Sister',
      phone: '012-345-6808',
      address: '67 Jalan Sultan Ismail, 50250 Kuala Lumpur'
    },
    schedule: {
      shift: 'Morning',
      workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  }
];