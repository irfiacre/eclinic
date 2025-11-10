import { User } from './user.entity';
import { Nurse } from './staff.entity';
export declare class Decision {
    id: string;
    decision: string;
    isSent: boolean;
    user: User;
    nurse: Nurse;
    createdAt: Date;
}
