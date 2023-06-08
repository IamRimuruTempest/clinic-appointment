import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  docData,
  setDoc,
  addDoc,
  collectionData,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  and,
} from '@angular/fire/firestore';
import { UserAuth } from '../interfaces/user.model';
import { UserAccount } from '../interfaces/user-account.model';
import { Appointment } from '../interfaces/appointment.model';
import { Notification } from '../interfaces/notification.model';
import { Observable } from 'rxjs';
import { collection } from '@firebase/firestore';
import { Inventory } from '../interfaces/inventory.model';
import { Service } from '../interfaces/service.model';
import { InventoryHistory } from '../interfaces/inventory-history.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  async addUser(user: UserAccount) {
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return setDoc(userDocRef, { ...user });
  }

  updateUser(user: UserAccount): Promise<any> {
    return this.addUser(user);
  }

  async updateUserInformation(user: UserAccount, uid: string) {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return updateDoc(userDocRef, { ...user });
  }

  getUser(uid: string): Observable<UserAccount> {
    const accountDocRef = doc(this.firestore, `users/${uid}`);
    return docData(accountDocRef, {
      idField: 'uid',
    }) as Observable<UserAccount>;
  }

  getAllUser(): Observable<UserAccount[]> {
    const accountRef = collection(this.firestore, `users`);
    return collectionData(accountRef, {
      idField: 'uid',
    }) as Observable<UserAccount[]>;
  }

  getAppointments(): Observable<Appointment[]> {
    const appointmentsRef = collection(this.firestore, 'appointments');
    return collectionData(appointmentsRef, {
      idField: 'id',
    }) as Observable<Appointment[]>;
  }

  getApprovedAppointments(today: string): Observable<Appointment[]> {
    const approvedAppointmentsRef = collection(this.firestore, 'appointments');
    const qry = query(approvedAppointmentsRef, where('schedule', '!=', today));
    const newQry = query(qry, where('status', '==', 'Approved'));
    return collectionData(newQry, { idField: 'id' }) as Observable<
      Appointment[]
    >;
  }
  getAppointmentsByDateRange(
    monday: string,
    sunday: string
  ): Observable<Appointment[]> {
    console.log(monday, sunday);
    const approvedAppointmentsRef = collection(this.firestore, 'appointments');
    const newQry = query(
      approvedAppointmentsRef,
      and(
        where('status', 'in', ['Canceled', 'Finished']),
        where('schedule', '>=', monday),
        where('schedule', '<=', sunday)
      )
    );
    const qry = query(
      newQry,
      orderBy('schedule', 'desc'),
      orderBy('timestamp', 'desc')
    );
    return collectionData(qry, { idField: 'id' }) as Observable<Appointment[]>;
  }
  getPendingAppointments(): Observable<Appointment[]> {
    const appointmentsRef = collection(this.firestore, 'appointments');
    const qry = query(appointmentsRef, where('status', '==', 'Pending'));
    return collectionData(qry, { idField: 'id' }) as Observable<Appointment[]>;
  }

  getOngoingAppointments(today: string): Observable<Appointment[]> {
    const ongoingAppointmentsRef = collection(this.firestore, 'appointments');
    const qry = query(ongoingAppointmentsRef, where('schedule', '==', today));
    const newQry = query(qry, where('status', '==', 'Approved'));
    return collectionData(newQry, { idField: 'id' }) as Observable<
      Appointment[]
    >;
  }

  getUserAppointments(uid: string): Observable<Appointment[]> {
    const userAppointmentsRef = collection(this.firestore, 'appointments');
    const qry = query(userAppointmentsRef, where('uid', '==', uid));
    return collectionData(qry, { idField: 'id' }) as Observable<Appointment[]>;
  }

  async addAppontment(appointment: Appointment) {
    const appointmentDocRef = collection(this.firestore, 'appointments/');
    return addDoc(appointmentDocRef, appointment);
  }

  async updateAppointment(appointment: Appointment, id: string) {
    const appointmentDocRef = doc(this.firestore, `appointments/${id}`);
    return updateDoc(appointmentDocRef, { ...appointment });
  }

  async deleteAppointment(id: string) {
    const appointmentDocRef = doc(this.firestore, `appointments/${id}`);
    return deleteDoc(appointmentDocRef);
  }

  getInventories(): Observable<Inventory[]> {
    const inventoryRef = collection(this.firestore, 'inventory');
    // const qry = query(inventoryRef, where('quantity', '!=', 0));
    return collectionData(inventoryRef, {
      idField: 'id',
    }) as Observable<Inventory[]>;
  }

  async addInventory(inventory: Inventory) {
    const inventoryDocRef = collection(this.firestore, 'inventory/');
    return addDoc(inventoryDocRef, inventory);
  }

  async addInventoryHistory(inventoryId: string, history: InventoryHistory) {
    const inventoryDocRef = collection(
      this.firestore,
      `inventory/${inventoryId}/inventory_history`
    );
    return addDoc(inventoryDocRef, history);
  }

  getInventoryHistory(inventoryId: string): Observable<InventoryHistory[]> {
    const inventoryColRef = collection(
      this.firestore,
      `inventory/${inventoryId}/inventory_history`
    );
    const q = query(inventoryColRef, orderBy('timestamp', 'desc'), limit(15));
    return collectionData(q, {
      idField: 'id',
    }) as Observable<InventoryHistory[]>;
  }

  async updateInventory(inventory: Inventory, id: string) {
    const inventoryDocRef = doc(this.firestore, `inventory/${id}`);
    return updateDoc(inventoryDocRef, { ...inventory });
  }

  async deleteInventoryt(id: string) {
    const inventoryDocRef = doc(this.firestore, `inventory/${id}`);
    return deleteDoc(inventoryDocRef);
  }

  getUserNotifications(uid: string) {
    const notificationRef = collection(
      this.firestore,
      `users/${uid}/notifications`
    );
    return collectionData(notificationRef, {
      idField: 'notification-id',
    });
  }

  addToNotification(notification: Notification, uid: string) {
    const notificationDocRef = collection(
      this.firestore,
      `users/${uid}/notifications`
    );
    return addDoc(notificationDocRef, notification);
  }

  async addToCart(inventory: Inventory, uid: string) {
    const cartDocRef = collection(this.firestore, `users/${uid}/carts`);
    return addDoc(cartDocRef, inventory);
  }

  getUserCart(uid: string) {
    const userCartRef = collection(this.firestore, `users/${uid}/carts`);
    return collectionData(userCartRef, {
      idField: 'uid',
    }) as Observable<Inventory[]>;
  }

  deleteUserCart(uid: string, id: string) {
    const userCartDocRef = doc(this.firestore, `users/${uid}/carts/${id}`);
    return deleteDoc(userCartDocRef);
  }

  addToOrder(order: any) {
    const orderDocRef = collection(this.firestore, `/orders`);
    return addDoc(orderDocRef, order);
  }

  getUserOrder(uid: string): Observable<Inventory[]> {
    const inventoryRef = collection(this.firestore, `orders/`);
    const qry = query(inventoryRef, where('account.' + uid, '==', 'Pending'));
    return collectionData(qry, {
      idField: 'id',
    }) as Observable<Inventory[]>;
  }

  getAllOrders() {
    const ordersRef = collection(this.firestore, `orders`);
    return collectionData(ordersRef, {
      idField: 'uid',
    });
  }

  getPendingOrders() {
    const ordersRef = collection(this.firestore, 'orders');
    const qry = query(ordersRef, where('status', '==', 'Pending'));
    return collectionData(qry, { idField: 'uid' }) as Observable<Appointment[]>;
  }

  updateUserOrder(order: any, uid: string) {
    const userOrderDocRef = doc(this.firestore, `orders/${uid}`);
    return updateDoc(userOrderDocRef, { ...order });
  }

  async deleteUserOrder(id: string) {
    const userOrderDocRef = doc(this.firestore, `orders/${id}`);
    return deleteDoc(userOrderDocRef);
  }

  // addToDummyOrder(inventory: Inventory, uid: string) {
  //   const orderDocRef = collection(this.firestore, `orders/${uid}`);
  //   return setDoc(orderDocRef, { ...inventory });
  // }

  // getUserAppointments(uid: string): Observable<Appointment> {
  //   const userAppointmentsDocRef = doc(this.firestore, `appointments/${uid}`);
  //   return docData(userAppointmentsDocRef, {
  //     idField: 'id',
  //   }) as Observable<Appointment>;
  // }

  // getAppointmentsById(uid: string): Observable<Appointment> {
  //   const appointmentDocRef = doc(this.firestore, `appointments/${uid}`);
  //   return docData(appointmentDocRef, {
  //     idField: 'uid',
  //   }) as Observable<Appointment>;
  // }

  async addCanceledAppointment(appointment: Appointment) {
    const canceledAppointmentDocRef = collection(
      this.firestore,
      'canceled-appointments/'
    );
    return addDoc(canceledAppointmentDocRef, appointment);
  }
  async addService(service: Service) {
    const serviceDocRef = collection(this.firestore, 'services/');
    return addDoc(serviceDocRef, service);
  }

  getAllServices() {
    const servicesRef = collection(this.firestore, `services`);
    return collectionData(servicesRef, {
      idField: 'id',
    }) as Observable<Service[]>;
  }
  async updateService(service: Service, id: string) {
    const serviceDocRef = doc(this.firestore, `services/${id}`);
    return updateDoc(serviceDocRef, { ...service });
  }

  async deleteService(id: string) {
    const serviceDocRef = doc(this.firestore, `services/${id}`);
    return deleteDoc(serviceDocRef);
  }
}
