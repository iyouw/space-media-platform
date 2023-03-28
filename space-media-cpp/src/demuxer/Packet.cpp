#include "Packet.h"

namespace SpaceMedia 
{
  void Packet::addData(shared_ptr<vector<shared_ptr<const uint8_t>>> data)
  {
    m_data->push_back(data);
  }
}