import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    planType: {
        type: String,
        enum: ['free', 'bronze', 'silver', 'gold'],
        default: 'free'
    },
    planPrice: {
        type: Number,
        default: 0
    },
    questionsPerDay: {
        type: Number,
        default: 1
    },
    questionsUsedToday: {
        type: Number,
        default: 0
    },
    lastResetDate: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    autoRenew: {
        type: Boolean,
        default: false
    },
    paymentId: {
        type: String
    },
    orderId: {
        type: String
    }
});

subscriptionSchema.methods.isExpired = function() {
    if (this.planType === 'free') return false;
    return this.endDate && new Date() > this.endDate;
};
subscriptionSchema.methods.resetDailyCount = function() {
    const today = new Date();
    const lastReset = new Date(this.lastResetDate);
    
    if (today.getDate() !== lastReset.getDate() || 
        today.getMonth() !== lastReset.getMonth() ||
        today.getFullYear() !== lastReset.getFullYear()) {
        this.questionsUsedToday = 0;
        this.lastResetDate = today;
        return true;
    }
    return false;
};

subscriptionSchema.methods.canPostQuestion = function() {
    this.resetDailyCount();
    
    if (this.planType === 'gold') return true;
    
    return this.questionsUsedToday < this.questionsPerDay;
};

export default mongoose.model("Subscription", subscriptionSchema);
