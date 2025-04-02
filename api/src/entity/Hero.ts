import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "heroes" })
export class Hero {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    nickname: string;

    @Column({ type: "timestamp", nullable: false })
    date_of_birth: Date;

    @Column({ nullable: false })
    universe: string;

    @Column({ nullable: false })
    main_power: string;

    @Column({ nullable: true })
    avatar_url: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}
